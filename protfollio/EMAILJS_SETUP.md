# EmailJS Setup Guide

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Set Up Email Service

1. **Add Email Service**:
   - Go to EmailJS Dashboard
   - Click "Add New Service"
   - Choose "Gmail" or "Outlook" (or your preferred email provider)
   - Connect your email account
   - Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. **Create Template**:
   - Go to "Email Templates" in EmailJS Dashboard
   - Click "Create New Template"
   - Use this template structure:

```html
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio website:

**Name:** {{from_name}}
**Email:** {{from_email}}
**Subject:** {{subject}}

**Message:**
{{message}}

---
Sent from your portfolio contact form
```

2. **Save Template**:
   - Save the template
   - Note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your User ID

1. Go to "Account" → "API Keys" in EmailJS Dashboard
2. Copy your **Public Key** (User ID)

## Step 5: Update Contact Form

Replace the placeholder values in `src/contact.tsx`:

```typescript
// Replace these with your actual EmailJS credentials
const serviceId = 'YOUR_SERVICE_ID'; // e.g., 'service_abc123'
const templateId = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xyz789'
const userId = 'YOUR_USER_ID'; // e.g., 'user_public_key_here'
```

## Step 6: Test the Form

1. Fill out the contact form on your website
2. Submit the form
3. Check your email for the received message
4. Check browser console for any errors

## Troubleshooting

### Common Issues:

1. **"Service not found" error**:
   - Double-check your Service ID
   - Ensure the service is properly connected

2. **"Template not found" error**:
   - Verify your Template ID
   - Make sure the template is published

3. **"User not found" error**:
   - Check your User ID (Public Key)
   - Ensure you're using the correct key

4. **Form not sending**:
   - Check browser console for errors
   - Verify all credentials are correct
   - Ensure EmailJS is properly imported

### Debug Steps:

1. Open browser console (F12)
2. Submit the form
3. Look for success/error messages
4. Check network tab for API calls

## Security Notes

- ✅ User ID (Public Key) is safe to expose in frontend code
- ✅ Service ID and Template ID are also public
- ✅ EmailJS handles the actual email sending securely
- ✅ No sensitive credentials are exposed

## Free Tier Limits

- **200 emails per month** (free tier)
- **Upgrade** for more emails if needed
- **No credit card required** for free tier

## Advanced Configuration

### Custom Email Template Variables:

You can add more variables to your template:

```html
**Phone:** {{phone}}
**Company:** {{company}}
**Project Type:** {{project_type}}
```

Then update the `templateParams` in your code:

```typescript
const templateParams = {
  from_name: formData.name,
  from_email: formData.email,
  subject: formData.subject,
  message: formData.message,
  to_name: 'Ranees',
  phone: formData.phone, // Add if you have phone field
  company: formData.company, // Add if you have company field
};
```

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Community: https://community.emailjs.com/
- Contact EmailJS Support: https://www.emailjs.com/support/ 