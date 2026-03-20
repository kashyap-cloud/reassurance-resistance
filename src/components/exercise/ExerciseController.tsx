import React, { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Screen1Welcome from './Screen1Welcome';
import Screen2WhatsHappening from './Screen2WhatsHappening';
import Screen3Breathing from './Screen3Breathing';
import Screen4NameIt from './Screen4NameIt';
import Screen5BodyCheck from './Screen5BodyCheck';
import Screen6TheWait from './Screen6TheWait';
import Screen7DuringWait from './Screen7DuringWait';
import Screen8Reflection from './Screen8Reflection';
import Screen9BuildHabit from './Screen9BuildHabit';
import Screen9BSaveSession from './Screen9BSaveSession';
import Screen10Closing from './Screen10Closing';
import ProgressDashboard from './ProgressDashboard';

type Screen = 'welcome' | 'whats-happening' | 'breathing' | 'name-it' | 'body-check' | 'the-wait' | 'during-wait' | 'reflection' | 'build-habit' | 'save-session' | 'closing' | 'dashboard';

interface SessionState {
  worryText: string;
  urgeType: string;
  namingResponse: string;
  bodyAreas: string[];
  timerDuration: number;
  moodEmoji: string;
  reflectionNote: string;
  nextGoal: string;
}

const ExerciseController: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [sessionData, setSessionData] = useState<SessionState>({
    worryText: '',
    urgeType: '',
    namingResponse: '',
    bodyAreas: [],
    timerDuration: 0,
    moodEmoji: '',
    reflectionNote: '',
    nextGoal: '',
  });

  const update = useCallback((partial: Partial<SessionState>) => {
    setSessionData(prev => ({ ...prev, ...partial }));
  }, []);

  const saveSession = async () => {
    try {
      const { error } = await supabase.from('exercise_sessions').insert({
        worry_text: sessionData.worryText,
        reassurance_urge_type: sessionData.urgeType,
        body_areas: sessionData.bodyAreas,
        timer_duration: sessionData.timerDuration,
        mood_emoji: sessionData.moodEmoji,
        reflection_note: sessionData.reflectionNote,
        next_time_goal: sessionData.nextGoal,
        naming_response: sessionData.namingResponse,
        is_completed: true,
        completed_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success('Session saved!');
      setScreen('dashboard');
    } catch {
      toast.error('Failed to save session');
    }
  };

  const resetAndStart = () => {
    setSessionData({
      worryText: '',
      urgeType: '',
      namingResponse: '',
      bodyAreas: [],
      timerDuration: 0,
      moodEmoji: '',
      reflectionNote: '',
      nextGoal: '',
    });
    setScreen('welcome');
  };

  switch (screen) {
    case 'welcome':
      return <Screen1Welcome onNext={() => setScreen('whats-happening')} onBack={() => {}} />;
    case 'whats-happening':
      return (
        <Screen2WhatsHappening
          onNext={(worry, urge) => {
            update({ worryText: worry, urgeType: urge });
            setScreen('breathing');
          }}
        />
      );
    case 'breathing':
      return <Screen3Breathing onNext={() => setScreen('name-it')} />;
    case 'name-it':
      return (
        <Screen4NameIt
          onNext={(response) => {
            update({ namingResponse: response });
            setScreen('body-check');
          }}
        />
      );
    case 'body-check':
      return (
        <Screen5BodyCheck
          onNext={(areas) => {
            update({ bodyAreas: areas });
            setScreen('the-wait');
          }}
        />
      );
    case 'the-wait':
      return (
        <Screen6TheWait
          onNext={(duration) => {
            update({ timerDuration: duration });
            setScreen('during-wait');
          }}
        />
      );
    case 'during-wait':
      return <Screen7DuringWait onNext={() => setScreen('reflection')} />;
    case 'reflection':
      return (
        <Screen8Reflection
          onNext={(emoji, note) => {
            update({ moodEmoji: emoji, reflectionNote: note });
            setScreen('build-habit');
          }}
        />
      );
    case 'build-habit':
      return (
        <Screen9BuildHabit
          onNext={(goal) => {
            update({ nextGoal: goal });
            setScreen('save-session');
          }}
        />
      );
    case 'save-session':
      return (
        <Screen9BSaveSession
          sessionData={sessionData}
          onSave={saveSession}
          onSkip={() => setScreen('closing')}
        />
      );
    case 'closing':
      return (
        <Screen10Closing
          onViewProgress={() => setScreen('dashboard')}
          onComplete={resetAndStart}
        />
      );
    case 'dashboard':
      return <ProgressDashboard onBack={resetAndStart} />;
    default:
      return null;
  }
};

export default ExerciseController;
