import React, { useState, useEffect, useRef } from 'react';
import { useToast } from './Toast';
import { API_URL } from '../config';
import { sectors } from '../data/sectorData';

export default function IssueForm({ onIssueAdded, initialSector }) {
  const toast = useToast();
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [formData, setFormData] = useState({ title: '', description: '', sector: initialSector || 'Agriculture', location: '', priority: 'Moyenne' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (initialSector) {
      setFormData(prev => ({ ...prev, sector: initialSector }));
    }
  }, [initialSector]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.warning('Connectez-vous pour signaler un problème');
      return;
    }
    setSending(true);
    try {
      const body = new FormData();
      body.append('title', formData.title);
      body.append('description', formData.description);
      body.append('sector', formData.sector);
      body.append('location', formData.location);
      body.append('priority', formData.priority);
      if (image) body.append('image', image);
      if (video) body.append('video', video);

      const res = await fetch(`${API_URL}/api/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body
      });
      if (res.ok) {
        toast.success('Signalement transmis avec succès');
        onIssueAdded();
        setFormData({ title: '', description: '', sector: 'Agriculture', location: '', priority: 'Moyenne' });
        setImage(null);
        setImagePreview(null);
        setVideo(null);
        setVideoPreview(null);
        if (imageInputRef.current) imageInputRef.current.value = '';
        if (videoInputRef.current) videoInputRef.current.value = '';
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
      <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
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
                {sectors.map(s => (
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Photo (optionnelle)</label>
              <div className="flex items-center gap-3">
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-ciGreen file:text-white hover:file:bg-ciDark file:cursor-pointer file:transition-all cursor-pointer"
                />
              </div>
              {imagePreview && (
                <div className="mt-3 relative inline-block">
                  <img src={imagePreview} alt="Aperçu" className="h-24 w-auto rounded-xl object-cover border border-gray-200" />
                  <button
                    type="button"
                    onClick={() => { setImage(null); setImagePreview(null); if (imageInputRef.current) imageInputRef.current.value = ''; }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold hover:bg-red-600 transition-all flex items-center justify-center"
                  >×</button>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Vidéo (optionnelle)</label>
              <div className="flex items-center gap-3">
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-ciOrange file:text-white hover:file:bg-ciDark file:cursor-pointer file:transition-all cursor-pointer"
                />
              </div>
              {videoPreview && (
                <div className="mt-3 relative inline-block">
                  <video src={videoPreview} controls className="h-24 w-auto rounded-xl border border-gray-200" />
                  <button
                    type="button"
                    onClick={() => { setVideo(null); setVideoPreview(null); if (videoInputRef.current) videoInputRef.current.value = ''; }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold hover:bg-red-600 transition-all flex items-center justify-center"
                  >×</button>
                </div>
              )}
            </div>
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
