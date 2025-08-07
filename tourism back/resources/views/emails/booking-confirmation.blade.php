<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تأكيد الحجز</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #007bff;
            margin: 0;
            font-size: 28px;
        }
        .booking-details {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #dee2e6;
        }
        .detail-label {
            font-weight: bold;
            color: #495057;
        }
        .detail-value {
            color: #212529;
        }
        .status {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status.pending {
            background-color: #fff3cd;
            color: #856404;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            color: #6c757d;
        }
        .cancel-info {
            background-color: #d1ecf1;
            border: 1px solid #bee5eb;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .cancel-info h3 {
            color: #0c5460;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 تأكيد الحجز</h1>
            <p>شكراً لك على اختيار خدماتنا</p>
        </div>

        <p>عزيزي/عزيزتي <strong>{{ $user->name }}</strong>,</p>
        
        <p>نؤكد لك أنه تم استلام طلب الحجز الخاص بك بنجاح. إليك تفاصيل حجزك:</p>

        <div class="booking-details">
            <h3>📋 تفاصيل الحجز</h3>
            
            <div class="detail-row">
                <span class="detail-label">رقم الحجز:</span>
                <span class="detail-value">#{{ $booking->id }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">نوع الحجز:</span>
                <span class="detail-value">{{ $bookingType }} ({{ $bookingTypeEn }})</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">اسم {{ $bookingType }}:</span>
                <span class="detail-value">{{ $bookable->name }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">تاريخ الوصول:</span>
                <span class="detail-value">{{ \Carbon\Carbon::parse($booking->check_in_date)->format('Y-m-d') }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">تاريخ المغادرة:</span>
                <span class="detail-value">{{ \Carbon\Carbon::parse($booking->check_out_date)->format('Y-m-d') }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">عدد الضيوف:</span>
                <span class="detail-value">{{ $booking->guests_count }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">إجمالي السعر:</span>
                <span class="detail-value">${{ number_format($booking->total_price, 2) }}</span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">حالة الحجز:</span>
                <span class="detail-value">
                    <span class="status pending">{{ $booking->status }}</span>
                </span>
            </div>
            
            <div class="detail-row">
                <span class="detail-label">طريقة الدفع:</span>
                <span class="detail-value">{{ $booking->payment_method }}</span>
            </div>
            
            @if($booking->special_requests)
            <div class="detail-row">
                <span class="detail-label">طلبات خاصة:</span>
                <span class="detail-value">{{ $booking->special_requests }}</span>
            </div>
            @endif
        </div>

        <div class="cancel-info">
            <h3>📝 معلومات الإلغاء</h3>
            <p>يمكنك إلغاء أو تعديل حجزك من خلال:</p>
            <ul>
                <li>تسجيل الدخول إلى حسابك على الموقع</li>
                <li>الذهاب إلى صفحة "حجوزاتي" في البروفايل</li>
                <li>اختيار الحجز المطلوب إلغاؤه أو تعديله</li>
            </ul>
            <p><strong>ملاحظة:</strong> قد تطبق شروط الإلغاء حسب سياسة كل فندق أو يخت.</p>
        </div>

        <p>سيتم التواصل معك قريباً لتأكيد الحجز وترتيب تفاصيل الدفع.</p>
        
        <p>إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا.</p>

        <div class="footer">
            <p>شكراً لاختيارك خدماتنا</p>
            <p><strong>فريق خدمة العملاء</strong></p>
            <p>تاريخ الإرسال: {{ now()->format('Y-m-d H:i') }}</p>
        </div>
    </div>
</body>
</html>
