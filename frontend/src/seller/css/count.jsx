// nếu : )            countstock =countstock +( quality(new)- quality )
// nếu : quality(new)<quality)          nếu     < countstock =countstock -(quality - quality(new)) >   lớn hơn 0 thì ko update . bé hơn 0 giữ cái cũ
// mình update quality(new) sau
// quality(new) :  quality = quality(new) .
//vd:1
let quality_new =90;
let quality=100;    //--90
let countstock=95;  //-->85
//vd:2
//  quality_new =200;
//  quality=100;       -->200
//  countstock=95;     --> 195
//vd:3 (ko có ví dụ 3 nhén báo người dùng nhập sai )
//  quality_new =1;
//  quality=100;       -->100
//  countstock=95;     --> 95 
if(quality_new>quality){
    countstock =countstock +( quality_new- quality )
    quality = quality_new
}else if(quality_new<quality){
    khonaydangduyet =countstock -(quality - quality_new)
    if(khonaydangduyet>=0){
        countstock = khonaydangduyet
        quality = quality_new
    }else{
        console.log('đơn hàng đã bán nhiều hơn số lượng mới cập nhật')
    }
}else{
    console.log('khỏi cập nhật 2 cái này')
}