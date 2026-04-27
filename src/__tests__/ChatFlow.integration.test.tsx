import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, vi } from 'vitest';
import App from '../App';

// Mock matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Firebase module so tests don't try to actually hit Firestore
vi.mock('../services/firebase', () => ({
  logUserSession: vi.fn().mockResolvedValue(true),
  getExistingSession: vi.fn().mockResolvedValue(null)
}));

describe('VoteGuide AI Integration Flow', () => {
  it('Should successfully navigate the entire Eligibility -> Polling Booth flow', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Wait for the app to initialize the bot message
    await waitFor(() => {
      expect(screen.getByText(/Welcome to VoteGuide AI/i)).toBeInTheDocument();
    });

    // 1. Click "Yes, I am" (Citizen)
    const citizenBtn = screen.getByRole('button', { name: /Select option: Yes, I am/i });
    await user.click(citizenBtn);

    // 2. Click "18 or older"
    await waitFor(() => {
      expect(screen.getByText(/How old are you\?/i)).toBeInTheDocument();
    });
    const ageBtn = screen.getByRole('button', { name: /Select option: 18 or older/i });
    await user.click(ageBtn);

    // 3. Type state name (Maharashtra)
    await waitFor(() => {
      expect(screen.getByText(/Which state or union territory/i)).toBeInTheDocument();
    });
    const input = screen.getByPlaceholderText(/Type your state/i);
    await user.type(input, 'Maharashtra');
    
    const submitBtn = screen.getByRole('button', { name: /Send message/i });
    await user.click(submitBtn);

    // 4. Click "No / I'm not sure" (Not registered)
    await waitFor(() => {
      expect(screen.getByText(/Are you already registered to vote/i)).toBeInTheDocument();
    });
    const notRegisteredBtn = screen.getByRole('button', { name: /Select option: No \/ I'm not sure/i });
    await user.click(notRegisteredBtn);

    // 5. Registration Guide shows up, click "Yes, what's next?"
    await waitFor(() => {
      expect(screen.getByText(/You can easily register to vote via the Voter Portal/i)).toBeInTheDocument();
    });
    const nextBtn = screen.getByRole('button', { name: /Select option: Yes, what's next\?/i });
    await user.click(nextBtn);

    // 6. Should see the Interactive Map mockup or the error boundary since we don't have the API key in test
    await waitFor(() => {
      expect(screen.getByText(/Interactive Map unavailable/i)).toBeInTheDocument();
    }, { timeout: 4000 });
  });
});
