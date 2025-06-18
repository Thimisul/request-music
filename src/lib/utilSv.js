"use server";

export async function isLocalConnect() {
  try {
    const { useLocal } = await getConfig();
    if (!useLocal) {
      return true;
    }
    const res = await fetch(process.env.LOCAL_VERIFY_URL);
    const local = await res.json();
    if (res.status === 222 && local.connected) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function validateAdminCode(formData) {
  const code = formData.get("accessCode");
  return code === process.env.ADMIN_CODE;
}
