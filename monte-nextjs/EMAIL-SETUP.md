# Email Configuration Guide

This application uses [Resend](https://resend.com) for sending contact form emails.

## Setup Instructions

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Free tier includes 100 emails/day, 3,000 emails/month

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Click "Create API Key"
4. Give it a name (e.g., "Monte Biuro Production")
5. Copy the API key (starts with `re_`)

### 3. Configure Environment Variables

Add the following to your `.env.local` file (or Vercel environment variables):

```bash
# Required: Resend API key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Required: Where to send contact form submissions
OFFICE_EMAIL=biuro@montebiuro.pl

# Optional: Sender email (must be verified in Resend)
FROM_EMAIL=onboarding@resend.dev
FROM_NAME=Monte Biuro
```

### 4. Verify Your Domain (Production)

For production use with your custom domain:

1. In Resend dashboard, go to [Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `montebiuro.pl`)
4. Add the DNS records shown to your domain provider
5. Once verified, update `FROM_EMAIL` to use your domain (e.g., `kontakt@montebiuro.pl`)

### 5. Deploy to Vercel

Add environment variables in Vercel:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable (RESEND_API_KEY, OFFICE_EMAIL, etc.)
4. Redeploy your application

## Testing

### Development Mode (No API Key)

If `RESEND_API_KEY` is not set, the contact form will:
- Accept submissions successfully
- Log email details to console
- Return success message to users
- **NOT send actual emails**

This is useful for local development without needing Resend credentials.

### Production Mode (With API Key)

When `RESEND_API_KEY` is configured:
- Emails are sent via Resend
- Logs success/failure to console
- Users always see success message (to prevent exposing configuration issues)

## Troubleshooting

### Emails Not Being Sent

1. **Check API Key**: Verify `RESEND_API_KEY` is set correctly
2. **Check Console**: Look for error messages in server logs
3. **Check Domain**: Ensure `FROM_EMAIL` uses a verified domain
4. **Check Limits**: Free tier has 100 emails/day limit

### Common Errors

- **"Missing API key"**: Add `RESEND_API_KEY` to environment variables
- **"Domain not verified"**: Use `onboarding@resend.dev` or verify your domain
- **"Rate limit exceeded"**: You've hit the daily/monthly limit

## Alternative Email Services

If you prefer a different email service, you can modify `/src/app/api/contact/route.ts`:

- **Nodemailer**: Use SMTP (Gmail, Outlook, etc.)
- **SendGrid**: Popular alternative with generous free tier
- **Mailgun**: Good for high volume
- **AWS SES**: Cheapest for high volume

The current implementation is designed to be easily replaceable.
