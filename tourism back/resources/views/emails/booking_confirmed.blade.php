<h2>تم تأكيد حجزك بنجاح!</h2>
<p>عزيزي {{ $booking->user->name }}،</p>
<p>تم تأكيد حجزك رقم <b>#{{ $booking->id }}</b> بنجاح.</p>
<p>
    <b>التفاصيل:</b><br>
    النوع: {{ class_basename($booking->bookable_type) }}<br>
    الاسم: {{ $booking->bookable->name }}<br>
    من: {{ $booking->check_in_date }}<br>
    إلى: {{ $booking->check_out_date }}<br>
    السعر الإجمالي: {{ $booking->total_price }} جنيه
</p>
<p>نتمنى لك إقامة سعيدة!</p>
<p>فريق السياحة</p>