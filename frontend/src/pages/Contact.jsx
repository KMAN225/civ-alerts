import React, { useState } from 'react';
import { useToast } from '../components/Toast';
import { API_URL } from '../config';

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        toast.error(data.message || 'Erreur lors de l\'envoi');
      }
    } catch {
      toast.error('Erreur de connexion au serveur');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-ciGreen to-green-700 p-8 sm:p-10 text-white">
            <h1 className="text-3xl sm:text-4xl font-black mb-2">Contactez-nous</h1>
            <p className="text-white/70 text-base max-w-xl font-medium">
              Une question, une suggestion, un partenariat ou un problème technique ? Notre équipe vous répondra sous 48 heures ouvrées.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {/* Form */}
            <div className="lg:col-span-3 p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom complet <span className="text-red-400">*</span></label>
                    <input
                      className="w-full p-3.5 bg-gray-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm placeholder:text-gray-400"
                      placeholder="Votre nom et prénom"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      className="w-full p-3.5 bg-gray-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm placeholder:text-gray-400"
                      placeholder="exemple@mail.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sujet <span className="text-red-400">*</span></label>
                  <input
                    className="w-full p-3.5 bg-gray-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm placeholder:text-gray-400"
                    placeholder="Objet de votre message"
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message <span className="text-red-400">*</span></label>
                  <textarea
                    className="w-full p-3.5 bg-gray-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all h-40 text-sm placeholder:text-gray-400 resize-none"
                    placeholder="Décrivez votre demande en quelques lignes..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    required
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-[10px] text-gray-400">Tous les champs marqués d'un <span className="text-red-400">*</span> sont obligatoires</p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-ciGreen text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-ciDark transition-all duration-300 shadow-lg shadow-ciGreen/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {sending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Envoi...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 p-8 sm:p-10 bg-gray-200/50">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Informations</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-ciGreen/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-ciGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Email</p>
                    <a href="mailto:contact@civ-alerts.ci" className="text-sm font-bold text-ciDark hover:text-ciGreen transition-colors">contact@civ-alerts.ci</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-ciOrange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-ciOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Adresse</p>
                    <p className="text-sm font-bold text-ciDark">Abidjan, Côte d'Ivoire</p>
                    <p className="text-[10px] text-gray-400">Plateforme nationale</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Horaires</p>
                    <p className="text-sm font-bold text-ciDark">Lun - Ven : 08h00 - 17h00</p>
                    <p className="text-[10px] text-gray-400">Fuseau UTC+0 (Abidjan)</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Suivez-nous</h4>
                  <div className="flex gap-3">
                    {['🐦', '💼', '📘', '💻'].map((icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="w-9 h-9 bg-gray-200 rounded-xl flex items-center justify-center hover:bg-ciGreen hover:text-white transition-all text-sm"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-ciGreen/5 rounded-2xl border border-ciGreen/10">
                <h4 className="text-xs font-black text-ciDark mb-1">Suivi des signalements</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Pour le suivi de vos signalements existants, <a href="/" className="text-ciGreen font-bold hover:underline">connectez-vous</a> à votre compte et consultez la section Explorateur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
