import { useState, useMemo } from 'react';
import { Search, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Specialization } from '../data/doctors';
import { useDoctors } from '../context/DoctorContext';

export function Doctors() {
  const { doctors } = useDoctors();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<Specialization | 'All'>('All');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const specializations: (Specialization | 'All')[] = [
    'All', 'General Medicine', 'Pediatrics', 'OB-GYN', 'Surgery', 'Internal Medicine'
  ];

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'All' || doc.specialization === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, doctors]);

  return (
    <section id="doctors" className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mb-4">Find a Doctor</h2>
            
            <div className="bg-slate-50 p-2 rounded-2xl flex flex-col md:flex-row md:items-center shadow-inner border border-slate-200 gap-2 mb-4">
              <div className="flex-1 px-4 flex items-center gap-3 py-2 md:py-0">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  className="bg-transparent border-none text-sm focus:ring-0 w-full outline-none"
                  placeholder="Find a doctor by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-black transition-colors w-full md:w-auto">
                Search
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] text-slate-400 font-bold uppercase py-2">Filter:</span>
              {specializations.map(spec => (
                <button
                  key={spec}
                  onClick={() => setActiveFilter(spec)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded hover:underline transition-colors ${
                    activeFilter === spec 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:text-blue-600 bg-transparent'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredDoctors.map(doctor => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  key={doctor.id}
                  className="group rounded-2xl bg-slate-50 border border-transparent xl:border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all flex flex-col overflow-hidden"
                >
                  <div className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => setExpandedDoc(expandedDoc === doctor.id ? null : doctor.id)}>
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-blue-700 font-black text-sm">
                      {doctor.image ? (
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const match = doctor.name.replace('Dr. ', '').trim().split(' ');
                            const initials = match.length > 1 ? `${match[0][0]}${match[match.length - 1][0]}` : match[0].slice(0, 2);
                            if (e.currentTarget.parentElement) {
                              const parent = e.currentTarget.parentElement;
                              parent.innerText = initials.toUpperCase();
                            }
                          }}
                        />
                      ) : (() => {
                        const match = doctor.name.replace('Dr. ', '').trim().split(' ');
                        const initials = match.length > 1 ? `${match[0][0]}${match[match.length - 1][0]}` : match[0].slice(0, 2);
                        return initials.toUpperCase();
                      })()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{doctor.name}</p>
                      <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wide mt-0.5">{doctor.specialization}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {doctor.availableToday ? (
                        <div className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded">Available Today</div>
                      ) : (
                        <div className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-1 rounded">Next: {doctor.nextAvailable?.split(',')[0]}</div>
                      )}
                      <div className="text-slate-400 mt-1">
                        {expandedDoc === doctor.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedDoc === doctor.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white border-t border-blue-50"
                      >
                        <div className="p-4 text-sm font-medium text-slate-700">
                          <p className="text-xs text-slate-500 mb-4">{doctor.description}</p>
                          
                          <div className="mb-4">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">Clinic Schedule</h4>
                            <ul className="space-y-1.5">
                              {doctor.schedules.map((sched, idx) => (
                                <li key={idx} className="flex justify-between items-center text-xs">
                                  <span className="font-bold text-slate-800">{sched.day}</span>
                                  <span className="text-slate-500">{sched.time}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">HMO Accreditation</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {doctor.hmoAccreditation && doctor.hmoAccreditation.length > 0 ? (
                                doctor.hmoAccreditation.map((hmo, idx) => (
                                  <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] px-2 py-1 rounded font-bold uppercase">{hmo}</span>
                                ))
                              ) : (
                                <span className="text-[10px] text-slate-500 font-bold uppercase bg-slate-50 px-2 py-1 rounded border border-transparent">None currently</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredDoctors.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 text-sm font-medium">
                No doctors found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
