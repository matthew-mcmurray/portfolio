import { ROLES } from "./roles";
// Permission helper file for UI code to call instead of doing role checks inline

/*
 * Permission rules: the single source of truth for what each role can do.
 *
 *               read  create  edit  override  duplicate  delete   lock    unlock
 *  ADMIN         ✓      ✓      ✓       ✓          ✓        ✓       ✓        ✓
 *  EDITOR        ✓      ✓      ✓       ✓          ·      owner     ✓    holder/owner
 *  MEMBER        ✓      ·      ·       ·          ·        ·     owner  holder/owner
 *  AUTOMATION    ✓      ·      ·       ·          ✓        ·       ·        ·
 */
export const ROLES = Object.freeze({
  ADMIN: "admin",
  EDITOR: "editor",
  MEMBER: "member",
  AUTOMATION: "automation",
});

const RULES = {
  read: () => true,
  create: ({ role }) => role === ROLES.EDITOR,
  edit: ({ role }) => role === ROLES.EDITOR,
  override: ({ role }) => role === ROLES.EDITOR,
  duplicate: ({ role }) => role === ROLES.AUTOMATION,
  delete: ({ role, isOwner }) => role === ROLES.EDITOR && isOwner,

  toggleLock: ({ role, isOwner, lock }) => {
    if (role === ROLES.AUTOMATION) return false;
    // Unlocking: the current lock holder or the record's owner can release it.
    if (lock.isLocked) return lock.isHolder || isOwner;
    // Locking: editors can lock any record; members only their own.
    return role === ROLES.EDITOR || (role === ROLES.MEMBER && isOwner);
  },
};

/* can("delete", { role, isOwner })
 * can("toggleLock", { role, isOwner, lock: { isLocked, isHolder } }) */
export function can(action, { role, isOwner = false, lock = {} } = {}) {
  if (role === ROLES.ADMIN) return true;

  const rule = RULES[action];
  if (!rule) return false;

  return rule({
    role,
    isOwner,
    lock: { isLocked: false, isHolder: false, ...lock },
  });
}