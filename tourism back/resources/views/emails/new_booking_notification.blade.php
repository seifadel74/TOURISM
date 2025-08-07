<h2>إشعار بحجز جديد</h2>
<p>تم إنشاء حجز جديد على الموقع:</p>
<p>
    <b>رقم الحجز:</b> #{{ $booking->id }}<br>
    <b>اسم العميل:</b> {{ $booking->user->name }}<br>
    <b>البريد:</b> {{ $booking->user->email }}<br>
    <b>النوع:</b> {{ class_basename($booking->bookable_type) }}<br>
    <b>الاسم:</b> {{ $booking->bookable->name }}<br>
    <b>من:</b> {{ $booking->check_in_date }}<br>
    <b>إلى:</b> {{ $booking->check_out_date }}<br>
    <b>السعر الإجمالي:</b> {{ $booking->total_price }} جنيه
</p>
<p>يرجى متابعة لوحة التحكم لمراجعة الحجز.</p>