<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إعادة تعيين كلمة المرور</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
            direction: rtl;
            text-align: right;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .email-header .icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        .email-body {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #666;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
            transition: transform 0.3s ease;
        }
        .reset-button:hover {
            transform: translateY(-2px);
        }
        .security-info {
            background: #f8f9fa;
            border-right: 4px solid #667eea;
            padding: 20px;
            margin: 30px 0;
            border-radius: 5px;
        }
        .security-info h3 {
            color: #333;
            margin-top: 0;
            font-size: 16px;
        }
        .security-info p {
            color: #666;
            margin-bottom: 0;
            font-size: 14px;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #eee;
        }
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        .token-info {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 14px;
            color: #856404;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <div class="icon">🔐</div>
            <h1>إعادة تعيين كلمة المرور</h1>
        </div>
        
        <div class="email-body">
            <div class="greeting">
                مرحباً {{ $user->name }}،
            </div>
            
            <div class="message">
                لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك في تطبيق السياحة. 
                إذا كنت قد طلبت هذا، يرجى النقر على الزر أدناه لإعادة تعيين كلمة المرور الخاصة بك.
            </div>
            
            <div style="text-align: center;">
                <a href="{{ $resetUrl }}" class="reset-button">
                    🔑 إعادة تعيين كلمة المرور
                </a>
            </div>
            
            <div class="security-info">
                <h3>🛡️ معلومات أمنية مهمة:</h3>
                <p>• هذا الرابط صالح لمدة 24 ساعة فقط</p>
                <p>• إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذا الإيميل</p>
                <p>• لا تشارك هذا الرابط مع أي شخص آخر</p>
                <p>• تأكد من إنشاء كلمة مرور قوية وآمنة</p>
            </div>
            
            <div class="token-info">
                <strong>ملاحظة:</strong> إذا لم يعمل الزر أعلاه، يمكنك نسخ الرابط التالي ولصقه في متصفحك:
                <br><br>
                <code>{{ $resetUrl }}</code>
            </div>
            
            <div class="message">
                إذا واجهت أي مشاكل أو لديك أسئلة، لا تتردد في التواصل مع فريق الدعم الفني.
            </div>
        </div>
        
        <div class="footer">
            <p>
                هذا إيميل تلقائي من تطبيق السياحة<br>
                © {{ date('Y') }} جميع الحقوق محفوظة
            </p>
            <p>
                <a href="mailto:support@tourism-app.com">support@tourism-app.com</a>
            </p>
        </div>
    </div>
</body>
</html>
