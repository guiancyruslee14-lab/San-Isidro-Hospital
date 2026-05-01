import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { DOCTORS as INITIAL_DOCTORS, Doctor } from '../data/doctors';

interface DoctorContextType {
  doctors: Doctor[];
  updateDoctor: (doctor: Doctor) => void;
  addDoctor: (doctor: Doctor) => void;
  removeDoctor: (id: string) => void;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export function DoctorProvider({ children }: { children: ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const saved = localStorage.getItem('siha_doctors');
      return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
    } catch {
      return INITIAL_DOCTORS;
    }
  });

  useEffect(() => {
    localStorage.setItem('siha_doctors', JSON.stringify(doctors));
  }, [doctors]);

  const updateDoctor = (updatedDoctor: Doctor) => {
    setDoctors(doctors.map(d => d.id === updatedDoctor.id ? updatedDoctor : d));
  };

  const addDoctor = (newDoctor: Doctor) => {
    setDoctors([...doctors, newDoctor]);
  };

  const removeDoctor = (id: string) => {
    setDoctors(doctors.filter(d => d.id !== id));
  };

  return (
    <DoctorContext.Provider value={{ doctors, updateDoctor, addDoctor, removeDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
}

export const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (!context) throw new Error("useDoctors must be used within DoctorProvider");
  return context;
};
