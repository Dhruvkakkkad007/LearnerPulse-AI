/**
 * LearnAI Backend API Service
 * Connects React Frontend to the FastAPI Machine Learning Server (port 8000)
 * with graceful fallback to local ML engine if backend is offline.
 */

import { predictStudentOutcome } from './mlEngine';

const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Check if the FastAPI backend server is online & model is loaded
 */
export async function checkBackendStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return { online: true, ...data };
    }
    return { online: false };
  } catch (error) {
    return { online: false, error: error.message };
  }
}

/**
 * Perform student prediction via FastAPI ML model (.pkl)
 */
export async function predictStudent(studentData) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        ...data,
        source: 'fastapi'
      };
    }
  } catch (error) {
    console.warn('[LearnAI] FastAPI server not reachable, using embedded ML engine:', error.message);
  }

  // Fallback to client-side ML engine
  const localResult = predictStudentOutcome(studentData);
  return {
    ...localResult,
    source: 'client_fallback',
    modelEngine: 'Client Decision Tree Engine (Trained Depth 4)'
  };
}

/**
 * Fetch Analytics data from FastAPI
 */
export async function fetchAnalytics() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${API_BASE_URL}/analytics`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('[LearnAI] Analytics endpoint unavailable, using static dataset metrics.');
  }
  return null;
}
