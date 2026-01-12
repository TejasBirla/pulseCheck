import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_EMAIL_API);

export const generateStatusEmail = (monitor, oldStatus, status) => {
  // Safe defaults
  const userName = monitor?.user?.user || "User";
  const monitorName = monitor?.name || "Your Monitor";
  const monitorUrl = monitor?.url || "";
  const protocol = (monitor?.protocol || "http").toLowerCase();
  const statusColor = status === "up" ? "#28a745" : "#dc3545";
  const oldStatusText = oldStatus ? oldStatus.toUpperCase() : "UNKNOWN";
  const newStatusText = status.toUpperCase();

  return `
  <div style="
      font-family: 'Helvetica', Arial, sans-serif; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 30px; 
      border-radius: 10px; 
      background-color: #ffffff; 
      border: 1px solid #e0e0e0; 
      box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  ">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="
          color: #0a2540; 
          font-size: 24px; 
          margin: 0;
      ">PulseCheck Monitor Alert</h1>
    </div>

    <p style="font-size: 16px; color: #333; line-height: 1.5;">
      Hello <strong>${userName}</strong>,
    </p>

    <p style="font-size: 16px; color: #333; line-height: 1.5;">
      Your monitor <strong>${monitorName}</strong> 
      (<a href="${protocol}://${monitorUrl}" target="_blank" style="color: #1a73e8; text-decoration: none;">${monitorUrl}</a>) 
      has changed status.
    </p>

    <div style="
        text-align: center; 
        margin: 20px 0; 
        padding: 15px; 
        border-radius: 8px; 
        background-color: ${statusColor}1A; 
        font-weight: bold; 
        font-size: 18px; 
        color: ${statusColor};
    ">
      ${oldStatusText} → ${newStatusText}
    </div>

    <p style="text-align: center; font-size: 14px; color: #666; margin: 10px 0;">
      Checked at: ${new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      })}
    </p>

    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

    <p style="font-size: 12px; color: #999; text-align: center; line-height: 1.5;">
      You are receiving this email because you have an active PulseCheck account.
    </p>
  </div>
  `;
};

export const sendMail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log("Failed to send email: ", error.message);
  }
};
