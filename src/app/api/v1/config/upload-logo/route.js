import { uploadLogo } from "@/lib/admin/logo-actions";

export const POST = async (req) => {
  const formData = await req.formData();
  const result = await uploadLogo(formData);
  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 400,
    headers: { "Content-Type": "application/json" },
  });
};
