"use client"

import { useState } from 'react';
import { FileText, Send } from 'lucide-react';

interface PatentInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export function PatentInput({ onSubmit, isLoading }: PatentInputProps) {
  const [patentText, setPatentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patentText.trim() && !isLoading) {
      onSubmit(patentText.trim());
    }
  };

  const loadSample = () => {
    const sampleText = `INVENTION DISCLOSURE

Title: Smart Water Bottle with Hydration Tracking

Inventor: John Smith
Date: September 13, 2025

FIELD OF THE INVENTION
This invention relates to smart water bottles and hydration monitoring systems.

BACKGROUND OF THE INVENTION
Many people struggle to maintain proper hydration throughout the day. Existing water bottles lack intelligent tracking capabilities, and most hydration apps require manual input, leading to inaccurate tracking and poor user compliance.

SUMMARY OF THE INVENTION
The present invention is a smart water bottle that automatically tracks water consumption using a combination of sensors and provides real-time hydration feedback to users through a mobile application.

DETAILED DESCRIPTION

The smart water bottle comprises:

1. BOTTLE STRUCTURE
- Insulated stainless steel body (500ml capacity)
- BPA-free cap with integrated electronics
- Waterproof seal design

2. SENSOR SYSTEM
- Weight sensor in the base to measure water level changes
- Temperature sensor to track water temperature
- Accelerometer to detect drinking motions
- Ambient light sensor for display adjustment

3. ELECTRONICS
- Microcontroller (ESP32-based)
- Bluetooth 5.0 connectivity
- Rechargeable lithium battery (7-day life)
- LED display ring around the cap showing hydration status

4. SOFTWARE FEATURES
- Automatic consumption detection when user tilts bottle
- Personalized hydration goals based on user profile
- Smart reminders via app notifications
- Water quality tracking (temperature preferences)
- Integration with fitness trackers

5. MOBILE APPLICATION
- Real-time hydration dashboard
- Historical consumption patterns
- Achievement system and rewards`;
    setPatentText(sampleText);
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Patent Disclosure Input</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patent-text" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your patent disclosure or invention description:
          </label>
          <textarea
            id="patent-text"
            value={patentText}
            onChange={(e) => setPatentText(e.target.value)}
            placeholder="Paste your patent disclosure here..."
            className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={loadSample}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            disabled={isLoading}
          >
            Load Sample Patent
          </button>
          
          <button
            type="submit"
            disabled={!patentText.trim() || isLoading}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
            {isLoading ? 'Processing...' : 'Analyze Patent'}
          </button>
        </div>
      </form>
    </div>
  );
}
