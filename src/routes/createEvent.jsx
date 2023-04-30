import { redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const submission = Object.fromEntries(formData);
  console.log(submission);
  console.log("triggered");
  return redirect("/events");
}
