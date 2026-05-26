import React, { useState, useEffect } from 'react';
import { useToast } from './Toast';
import { API_URL } from '../config';

export default function IssueForm({ onIssueAdded, initialSector }) {
  const toast = useToast();
  const [formData, setFormData] = useState({ title: '', description: '', sector: initialSector || 'Agriculture', location: '', priority: 'Moyenne' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (initialSector) {
      setFormData(prev => ({ ...prev, sector: initialSector }));
    }
  }, [initialSector]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.warning('Connectez-vous pour signaler un problème');
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success('Signalement transmis avec succès');
        onIssueAdded();
        setFormData({ title: '', description: '', sector: 'Agriculture', location: '', priority: 'Moyenne' });
      } else {
        const err = await res.json();
        const msg = err.errors ? err.errors.map(e => e.message).join('\n') : (err.message || 'Erreur lors de l\'envoi');
        toast.error(msg || 'Erreur lors de l\'envoi');
      }
    } catch {
      toast.error('Erreur de connexion au serveur');
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="signalement" className="scroll-mt-28">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-ciOrange rounded-full"></div>
            <div>
              <h3 className="text-lg font-black text-ciDark">Nouveau Signalement</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Formulaire citoyen</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Titre du problème</label>
            <input
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm placeholder:text-gray-400"
              placeholder="Ex : Route dégradée, panne d'électricité..."
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
            <textarea
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all h-28 text-sm placeholder:text-gray-400 resize-none"
              placeholder="Décrivez le problème en quelques phrases..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Secteur</label>
              <select
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm cursor-pointer"
                value={formData.sector}
                onChange={e => setFormData({...formData, sector: e.target.value})}
              >
                {['Agriculture', 'Santé', 'Éducation', 'Transport', 'Numérique', 'Énergie'].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Localisation</label>
              <input
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm placeholder:text-gray-400"
                placeholder="Ville, quartier"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Priorité</label>
            <select
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm cursor-pointer"
              value={formData.priority}
              onChange={e => setFormData({...formData, priority: e.target.value})}
            >
              <option value="Faible">Faible</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Critique">Critique</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-ciGreen text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-ciDark transition-all duration-300 shadow-lg shadow-ciGreen/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {sending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Envoi en cours...
              </>
            ) : (
              <>
                <span>Envoyer le rapport</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
