$(function(){
	var table=$('.table');
		card=[],
		color=['s','h','c','d'];	//s黑桃，h红桃，c梅花
		form={};
	while(card.length<52){
		var num=Math.ceil(Math.random()*13),
			huase=color[Math.floor(Math.random()*4)];
		if(!form[num+'_'+huase]){
			form[num+'_'+huase]=true;
			card.push({
				num:num,
				huase:huase
			})
		}
	}
	// console.dir(card);
	// console.log(table);
	var dirs={
		'1':'A',
		'2':2,
		'3':3,
		'4':4,
		'5':5,
		'6':6,
		'7':7,
		'8':8,
		'9':9,
		'10':'T',
		'11':'J',
		'12':'Q',
		'13':'K',
	}
	for(var i=0,index=0;i<7;i++){
		for(var j=0;j<i+1;j++){
			index++;
			var item=card[index];
			var url='url(img/'+dirs[item.num]+item.huase+'.png)';
			$('<div>')
				.attr('id',i+'_'+j)
				.data('num',item.num)
				.addClass('card')
				.css({'backgroundImage':url})
				.appendTo(table)
				.delay(index*30)
				.animate({
					opacity:1,
					left:(6-i)*50+j*100,
					top:i*50
				})
		}
	}
	for(;index<card.length;index++){
		var item=card[index];
		var url='url(img/'+dirs[item.num]+item.huase+'.png)';
		$('<div>')
			.attr('id',i+'_'+j)
			.data('num',item.num)
			.addClass('card left')
			.css({'backgroundImage':url})
			.appendTo(table)
			.delay(index*30)
			.animate({
				opacity:1,
				left:150,
				top:460
			})	}
	var first=null;
	$('.table .card').click(function(){
		var coordinate=$(this).attr('id').split('_'),
			i=Number(coordinate[0]),
			j=Number(coordinate[1]);
		if(($('#'+(i+1)+'_'+j).length||$('#'+(i+1)+'_'+(j+1)).length)&&(i<6)){
			return;
		}
		if($(this).data('num')===13){
			$(this)
			.animate({
				top: 0,
				left: 600,
				opacity :0
			})
			.queue(function(){
				$(this).remove();
			})
			return;
		}
		$(this).toggleClass('active');
		// console.log($(this)[0]);
		// console.log($('.card.active')[0])
		if($(this).hasClass('active')){
			$(this).animate({top:'-=30'});
		}else{
			$(this).animate({top:'+=30'});
		}
		if(!first){
			first=$(this);
		}else{
			// console.log(this);
			// console.log(first);
			if($(this).data('num')+first.data('num')==13){
				$('.card.active').each(function(index,obj){
					$(obj).animate({
						top:0,
						left:600,
						opacity:0
					}).queue(function(){
						$(this).remove();
						$(first).remove();
					})
				})
			}
			else{
				$('.card.active').removeClass('active').each(function(index,obj){
					$(obj).animate({
						top:'+=30'
					})
				})
			}
			first=null;
		}
	})
	var zIndex=1;
	$('.table .moveRight').click(function(){
		$('.card.left')
		.eq(-1)
		.addClass('right')
		.removeClass('left')
		.css('zIndex',++zIndex)
		.animate({
			left:'+=340'
		})
		// $('.card.active').removeClass('active').each(function(index,obj){
		// 	$(obj).animate({
		// 		top:'+=30'
		// 	})
		// })
	})
	$('.table .moveLeft').click(function(){
		if($('.card.right').length<1){
			return;
		}else{
			$('.card.right').each(function(index,obj){
				$(obj)
				.addClass('left')
				.removeClass('right')
				.delay(index*30)
				.css('zIndex',++zIndex)
				.animate({
					left:'-=340'
				})
			})
		}
	})



})
