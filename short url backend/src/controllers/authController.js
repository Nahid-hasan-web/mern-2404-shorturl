const { emailReg, passwordReg } = require("../helpers/allRegex");
const generateOTP = require("../helpers/otpGenarator");
const authModel = require("../models/authModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require("jsonwebtoken");
// --------------------- node mailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "nahidhasan.cit.bd@gmail.com",
    pass: "tzak trlv lyhk kpsn",
  },
});
// ----------------------- register controller
const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName) return res.status(404).send("user name required");
    if (!emailReg.test(email)) return res.status(404).send("email is invalid");
    if (!passwordReg.test(password))
      return res.status(404).send("password is invalid");

    const hasPasswrod = bcrypt.hashSync(password, saltRounds);
    console.log(hasPasswrod);
    await new authModel({ userName, email, password: hasPasswrod }).save();

    const info = await transporter.sendMail({
      from: '"MERN 2404 "nahidhasan.cit.bd@gmail.com ',
      to: email,
      subject: "OTP Verifecation",
      text: "Hello world?", // plain‑text body
      html: `
            <!doctype html>
          <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
            <style>
              /* CLIENT-SAFE INLINE-LIKE STYLES (kept minimal) */
              body { background-color: #f4f7fb; margin:0; padding:0; -webkit-font-smoothing:antialiased; }
              table { border-collapse: collapse; }
              img { border:0; display:block; }
              .container { width:100%; max-width:600px; margin:0 auto; }
              .card { background:#ffffff; border-radius:8px; padding:32px; }
              .logo { width:120px; margin:0 auto 20px; }
              h1 { font-family: 'Helvetica Neue', Arial, sans-serif; font-size:20px; margin:0 0 12px; color:#0f172a; }
              p { font-family: 'Helvetica Neue', Arial, sans-serif; font-size:15px; line-height:1.5; color:#475569; margin:0 0 16px; }
              .otp { font-family: 'Courier New', Courier, monospace; font-size:28px; letter-spacing:4px; background:#f1f5f9; padding:12px 18px; border-radius:6px; display:inline-block; color:#0b1220; }
              .btn { display:inline-block; text-decoration:none; padding:12px 20px; border-radius:6px; font-weight:600; }
              .btn-primary { background:#48CFCB; color:#022; }
              .footer { font-size:13px; color:#94a3b8; }
              @media screen and (max-width:420px){ .card{padding:20px;} .logo{width:90px;} }
            </style>
          </head>
          <body>
            <!-- Preheader text (hidden in most clients but appears in inbox preview) -->
            <div style="display:none;max-height:0px;overflow:hidden;">Your verification code is inside — valid for 10 minutes.</div>

            <table class="container" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:28px 16px;">
                  <table width="100%" class="card" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td align="center">
                        <!-- Logo -->
                        <img src="https://via.placeholder.com/150x50?text=Logo" alt="Company Logo" class="logo" width="120" />
                      </td>
                    </tr>

                    <tr>
                      <td style="padding-top:6px;">
                        <h1>Verify your email address</h1>
                        <p>Hi <strong>${userName}</strong>,</p>
                        <p>Use the verification code below to complete your sign-in. This code is valid for <strong>10 minutes</strong>.</p>

                        <!-- OTP code -->
                        <p style="margin-top:18px; margin-bottom:22px; text-align:center;"><span class="otp">${generateOTP()}</span></p>

                        <p style="text-align:center; margin-bottom:22px;">
                          <a href="{{action_url}}" class="btn btn-primary">Verify now</a>
                        </p>

                        <p>If you didn't request this code, you can safely ignore this email. For security reasons, do not share this code with anyone.</p>

                        <hr style="border:none; border-top:1px solid #eef2f7; margin:22px 0;" />

                        <p class="footer">Need help? Reply to this email or visit our <a href="{{support_url}}">help center</a>.</p>

                      </td>
                    </tr>

                    <tr>
                      <td style="padding-top:18px; font-size:13px; color:#94a3b8;">
                        <p style="margin:0;">Regards,<br />{{company_name}}</p>
                        <p style="margin:8px 0 0;">{{company_address}}</p>
                      </td>
                    </tr>

                  </table>

                  <!-- Small footer under card -->
                  <table width="100%" style="max-width:600px; margin-top:12px;" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="font-size:12px; color:#9aa4b2;">
                        <p style="margin:8px 0 0;">If you're having trouble clicking the "Verify now" button, copy and paste the URL below into your browser:</p>
                        <p style="word-break:break-all; margin:8px 0 0;"><a href="{{action_url}}" style="color:#6b7280; text-decoration:underline;">{{action_url}}</a></p>
                        <p style="margin-top:10px;">© {{year}} {{company_name}}. All rights reserved.</p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>
          </body>
          </html>
        `, // HTML body
    });

    res.status(201).send("user registered sucess");
  } catch (err) {
    res.status(500).send(err);
  }
};
// -------------------- login controller
const loginController = async (req, res) => {
  const { email, password } = req.body;

  const exisistUser = await authModel.findOne({ email });

  if (!exisistUser) return res.status(404).send("user not registered");

  const comparePassword = bcrypt.compareSync(password, exisistUser.password);

  if (!comparePassword) return res.status(401).send("wrong password");

  const token = jwt.sign(
    {
      email: email,
    },
    process.env.token_pass,
    { expiresIn: "3m" }
  );

  res.send({ userInfo: exisistUser, accessToken: token });
};
// ------------------- update user profile
const updateProfile = (req, res) => {
  res.send("this is update");
};

module.exports = { register, loginController, updateProfile };
