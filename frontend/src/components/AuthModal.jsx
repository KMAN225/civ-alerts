import React, { useState } from 'react';
import { useToast } from './Toast';
import { API_URL } from '../config';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const toast = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const endpoint = isLogin ? 'login' : 'signup';
    try {
      const body = isLogin
        ? { identifier: formData.email, password: formData.password }
        : formData;

      const res = await fetch(`${API_URL}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success(isLogin ? 'Connexion réussie' : 'Compte créé avec succès');
        onAuthSuccess(data.user);
        onClose();
      } else {
        toast.error(data.message || 'Une erreur est survenue');
      }
    } catch {
      toast.error('Erreur de connexion au serveur');
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl shadow-black/10 animate-scale-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-br from-ciGreen to-green-700 p-8 text-white overflow-hidden">
          <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-white/5 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black">{isLogin ? 'Bon retour !' : 'Rejoignez-nous'}</h3>
                <p className="text-white/70 text-sm font-medium mt-1">
                  {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte citoyen'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white/80 hover:text-white transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom d'utilisateur</label>
              <input
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm placeholder:text-gray-400"
                placeholder="Votre pseudo"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm placeholder:text-gray-400"
              placeholder="exemple@mail.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mot de passe</label>
            <input
              type="password"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm placeholder:text-gray-400"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-ciGreen text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-ciDark transition-all duration-300 shadow-lg shadow-ciGreen/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Chargement...
              </>
            ) : (
              isLogin ? 'Se connecter' : 'Créer mon compte'
            )}
          </button>
          <p className="text-center text-sm text-gray-500 pt-2 border-t border-gray-50">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1.5 text-ciOrange font-bold hover:underline"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
