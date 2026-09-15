# Copy Tab URL(s) — Manual test plan

Use a throwaway Chrome profile. Load unpacked from the repository root. Chrome 150+ required.

## Prerequisites

- Developer mode enabled on `chrome://extensions`.
- Ability to multi-select tabs (Shift-click / Cmd-click).
- A text field to paste into (notes app or `data:text/html,<textarea>`).

---

## TC-01 Copy several selected tabs

**Setup:** Three tabs with distinct http(s) URLs. Shift-select all three.

**Steps:** Right-click one selected tab → **Copy URL(s)** → paste.

**Expected:** Three URLs, tab-strip order, default new-line separator.

---

## TC-02 Single tab

**Setup:** One highlighted tab.

**Steps:** Right-click that tab → **Copy URL(s)** → paste.

**Expected:** That tab’s URL only. No extra separator.

---

## TC-03 Clicked tab is only the anchor

**Setup:** Tabs A B C selected. Right-click B (not A).

**Steps:** Copy URL(s) → paste.

**Expected:** URLs of A, B, and C (all highlighted), not B alone.

---

## TC-04 Separator: space

**Steps:** Options → Space → select two tabs → copy → paste.

**Expected:** `urlA urlB` (single space).

---

## TC-05 Separator: comma

**Steps:** Options → Comma → copy two URLs → paste.

**Expected:** `urlA,urlB` (no extra spaces).

---

## TC-06 Separator: semicolon

**Steps:** Options → Semicolon → copy two URLs → paste.

**Expected:** `urlA;urlB`.

---

## TC-07 Custom separator

**Steps:** Options → Custom → enter ` | ` → copy two URLs → paste.

**Expected:** `urlA | urlB`. Setting still present after reload of the options page.

---

## TC-08 Empty custom separator

**Steps:** Custom → empty string → copy two URLs → paste.

**Expected:** URLs concatenated with no separator.

---

## TC-09 chrome:// URL

**Setup:** Include `chrome://extensions` in the highlighted set (with `tabs` permission).

**Steps:** Copy URL(s) → paste.

**Expected:** `chrome://extensions` appears in the pasted list.

---

## TC-10 Settings persist (sync)

**Steps:** Set separator to semicolon. Close options. Reopen options.

**Expected:** Semicolon still selected. On another Chrome profile signed into the same account with sync enabled, the same value appears after sync.
