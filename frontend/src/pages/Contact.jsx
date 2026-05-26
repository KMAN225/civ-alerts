import React, { useState } from 'react';
import { useToast } from '../components/Toast';

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Message envoyé avec succès');
    setForm({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 bg-ciGreen/5 px-3 py-1.5 rounded-full text-[10px] font-bold text-ciGreen uppercase tracking-wider border border-ciGreen/10 mb-6">
            Contact
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-ciDark mb-4">Contactez-nous</h1>
          <p className="text-gray-500 mb-8 max-w-lg">
            Une question, une suggestion ou un problème technique ? Écrivez-nous, nous vous répondrons dans les plus brefs délais.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom complet</label>
                <input
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm"
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm"
                  placeholder="exemple@mail.com"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sujet</label>
                <input
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all text-sm"
                  placeholder="Objet de votre message"
                  value={form.subject}
                  onChange={e => setForm({...form, subject: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ciGreen outline-none transition-all h-32 text-sm resize-none"
                  placeholder="Votre message..."
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-ciGreen text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-ciDark transition-all disabled:opacity-50"
              >
                {sending ? 'Envoi...' : 'Envoyer le message'}
              </button>
            </form>

            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-black text-ciDark uppercase tracking-wider mb-4">Informations</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">📧</span>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</p>
                      <a href="mailto:contact@civ-alerts.ci" className="text-sm text-ciGreen hover:underline font-medium">contact@civ-alerts.ci</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">📍</span>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Adresse</p>
                      <p className="text-sm text-gray-600 font-medium">Abidjan, Côte d'Ivoire</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">⏰</span>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Horaires</p>
                      <p className="text-sm text-gray-600 font-medium">Lun-Ven : 08h00 - 17h00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-ciGreen/5 to-transparent rounded-2xl border border-ciGreen/10">
                <h3 className="text-sm font-black text-ciDark uppercase tracking-wider mb-2">Suivi des signalements</h3>
                <p className="text-sm text-gray-500">Pour le suivi de vos signalements existants, connectez-vous à votre compte et consultez la section "Explorateur".</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
