import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Carmela V.",
      role: "Local Resident",
      content: "The pediatricians here are wonderful. My son usually fears hospitals, but Dr. Dela Cruz made him feel so comfortable. Booking an appointment was also incredibly fast.",
      rating: 5
    },
    {
      id: 2,
      name: "Ramon T.",
      role: "Patient",
      content: "I had a medical emergency late at night, and the response of the ED team was quick and highly professional. Highly recommended for any emergencies in Angono.",
      rating: 5
    },
    {
      id: 3,
      name: "Sofia M.",
      role: "Expecting Mother",
      content: "Great facilities and very clean. My OB-GYN consultations are always on time, and the staff is very accommodating. It's truly patient-first care.",
      rating: 5
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl text-center mb-8">What Our Patients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi) => (
            <div key={testi.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group hover:border-blue-300 transition-colors">
              <div className="flex gap-1 mb-4">
                {[...Array(testi.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm italic font-medium leading-relaxed text-slate-600 mb-6 flex-grow">"{testi.content}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-sm">
                  {testi.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">{testi.name}</p>
                  <p className="text-[10px] opacity-70 uppercase text-slate-500 font-bold tracking-wider mt-0.5">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
