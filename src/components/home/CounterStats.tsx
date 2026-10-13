import React from 'react';
import { Users, Briefcase, Building2, Smile } from 'lucide-react';

const stats = [
  { icon: Users, value: '1.500+', label: 'MUTLU MÜŞTERİ' },
  { icon: Briefcase, value: '45+', label: 'ÇALIŞAN SAYISI' },
  { icon: Building2, value: '3', label: 'ŞUBE SAYISI' },
  { icon: Smile, value: '%99.8', label: 'OLUMLU GERİ DÖNÜŞ' },
];

export default function CounterStats() {
  return (
    <div className="bg-brand-navy py-10 px-4 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="space-y-2 p-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-brand-yellow">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-black font-display tracking-tight text-white">
                {stat.value}
              </div>
              <div className="text-[11px] font-bold tracking-widest uppercase text-gray-300">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
