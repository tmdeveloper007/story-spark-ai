/* eslint-disable */
/**
 * useWorkspacePreferences.test.ts
 * Unit tests for the useWorkspacePreferences React hook.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useWorkspacePreferences from "../useWorkspacePreferences";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useWorkspacePreferences", () => {
  it("returns default preferences when localStorage is empty", () => {
    const { result } = renderHook(() => useWorkspacePreferences());

    expect(result.current).toEqual({
      aiProvider: "gemini",
      defaultGenre: "Drama",
      targetLength: "Medium (~600)",
      autoSave: true,
    });
  });

  it("returns saved aiProvider from localStorage", () => {
    localStorage.setItem("pref_aiProvider", "claude");
    localStorage.setItem("pref_defaultGenre", "Horror");
    localStorage.setItem("pref_targetLength", "Long (~1200)");
    localStorage.setItem("pref_autoSave", "false");

    const { result } = renderHook(() => useWorkspacePreferences());

    expect(result.current.aiProvider).toBe("claude");
    expect(result.current.defaultGenre).toBe("Horror");
    expect(result.current.targetLength).toBe("Long (~1200)");
    expect(result.current.autoSave).toBe(false);
  });

  it("autoSave defaults to true when pref_autoSave is absent", () => {
    localStorage.setItem("pref_aiProvider", "openai");

    const { result } = renderHook(() => useWorkspacePreferences());

    expect(result.current.autoSave).toBe(true);
  });

  it("autoSave is false when pref_autoSave is 'false'", () => {
    localStorage.setItem("pref_autoSave", "false");

    const { result } = renderHook(() => useWorkspacePreferences());

    expect(result.current.autoSave).toBe(false);
  });

  it("storage event from another tab updates preferences", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useWorkspacePreferences());

    // Simulate another tab changing localStorage
    act(() => {
      localStorage.setItem("pref_aiProvider", "perplexity");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "pref_aiProvider",
          newValue: "perplexity",
        })
      );
    });

    expect(result.current.aiProvider).toBe("perplexity");
  });

  it("cleanup removes storage event listener on unmount", () => {
    vi.useFakeTimers();

    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useWorkspacePreferences());

    expect(addSpy).toHaveBeenCalledWith("storage", expect.any(Function));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("storage", expect.any(Function));
  });
});
