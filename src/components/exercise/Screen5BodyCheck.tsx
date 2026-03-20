import React, { useState } from 'react';
import ScreenLayout from './ScreenLayout';

interface Screen5Props {
  onNext: (areas: string[]) => void;
}

const bodyAreas = [
  { id: 'head', label: 'Head', top: '8%', left: '50%' },
  { id: 'shoulders', label: 'Shoulders', top: '25%', left: '50%' },
  { id: 'chest', label: 'Chest', top: '38%', left: '50%' },
  { id: 'stomach', label: 'Stomach', top: '52%', left: '50%' },
  { id: 'hands', label: 'Hands', top: '60%', left: '50%' },
];

const Screen5BodyCheck: React.FC<Screen5Props> = ({ onNext }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleArea = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <ScreenLayout
      buttonText="I've Noticed →"
      onNext={() => onNext(selected)}
      buttonDisabled={selected.length === 0}
      currentStep={4}
      totalSteps={11}
    >
      <div className="space-y-4">
        <h1 className="screen-title">Where is the Anxiety Sitting?</h1>
        <p className="screen-text">
          Tap on the areas where you feel tension or discomfort right now
        </p>

        {/* Simple body outline with tappable zones */}
        <div className="relative mx-auto" style={{ width: 200, height: 320 }}>
          {/* Body SVG outline */}
          <svg viewBox="0 0 200 320" className="w-full h-full" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity={0.4}>
            {/* Head */}
            <circle cx="100" cy="35" r="25" />
            {/* Neck */}
            <line x1="100" y1="60" x2="100" y2="75" />
            {/* Torso */}
            <ellipse cx="100" cy="140" rx="45" ry="70" />
            {/* Arms */}
            <line x1="55" y1="90" x2="25" y2="180" />
            <line x1="145" y1="90" x2="175" y2="180" />
            {/* Legs */}
            <line x1="80" y1="205" x2="70" y2="310" />
            <line x1="120" y1="205" x2="130" y2="310" />
          </svg>

          {/* Tappable zones */}
          {bodyAreas.map((area) => (
            <button
              key={area.id}
              onClick={() => toggleArea(area.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-semibold ${
                selected.includes(area.id)
                  ? 'bg-primary/30 border-2 border-primary text-primary w-16 h-16'
                  : 'bg-accent/40 border border-border text-muted-foreground w-14 h-14 hover:bg-accent/60'
              }`}
              style={{ top: area.top, left: area.left }}
            >
              {area.label}
            </button>
          ))}
        </div>

        <p className="screen-text text-xs">
          Just notice. You don't need to fix anything — just be aware.
        </p>
      </div>
    </ScreenLayout>
  );
};

export default Screen5BodyCheck;
