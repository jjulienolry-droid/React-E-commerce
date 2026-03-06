import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { isAuthenticated } from "../utils/authService"

class LocalStorageMock {
  private store: Record<string, string> = {};
  getItem(key: string): string | null {
    return this.store[key] || null;
  }
  setItem(key: string, value: string): void {
    this.store[key] = value;
  }
  removeItem(key: string): void {
    delete this.store[key];
  }
  clear(): void {
    this.store = {};
  }
}

(globalThis as any).localStorage = new LocalStorageMock();

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  localStorage.clear()
})

describe("isAuthenticated", () => {

  it("retourne true si token présent", () => {

    localStorage.setItem("token", "abc123")

    expect(isAuthenticated()).toBe(true)

  })

  it("retourne false si pas de token", () => {

    localStorage.removeItem("token")

    expect(isAuthenticated()).toBe(false)

  })

})