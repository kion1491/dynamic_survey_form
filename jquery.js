
/* 설문지 문항 별 이동(drag & drop) 기능 */
$(function(){
  $("#q_section").sortable();
  $("#q_section").disableSelection();
});

/* 단일, 다중 객관식 문항 생성 코드 */
var qRadioBtn = '<input type="radio"> ';
var qCheckBox = '<input type="checkbox"> ';
var qLiFirst = '<li class="q_li">'+
								'<span class="ui-icon ui-icon-bullet"></span> ';			
var qLiSecond = '<input type="text" class="q_sel_input" placeholder="선택지 내용을 입력해주세요."> '+
								'<button class="q_add_btn"><span class="ui-icon ui-icon-plus"></button> '+
								'<button class="sel_del_btn"><span class="ui-icon ui-icon-minus"></button>'+
							'</li>';

/* 단일, 다중 객관식 문항의 선택지 제거 코드 */
$(document).on("click", ".sel_del_btn", function(){
	var qLiLength = $(this).parent().parent().children('li').length;
	if (qLiLength==1) {
		$(this).parent().parent().children('li').children('.sel_del_btn').attr('disabled', true);
	} else{
		$(this).parent().remove();
	}
});

/* 단일, 다중 객관식 문항의 선택지 추가 코드 */
$(document).on("click", ".q_add_btn", function(){
	var qLiClass = $(this).parent().parent().parent().parent().hasClass('multi_choice_row');
	switch (qLiClass){
		case true:
			$(this).parent().after(qLiFirst + qRadioBtn + qLiSecond);
			break;
		case false:
			$(this).parent().after(qLiFirst + qCheckBox + qLiSecond);
			break;
	}
});

/* 단일, 다중 객관식 문항의 선택지 개수 체크 후에 1개일 시 선택지 삭제버튼 비활성화 코드 */
$(document).on("mouseup", ".q_li", function(){
	var qLiLength = $(this).parent().children('li').length;
	if (qLiLength==1) {
		$(this).parent().children(".q_li").children('.sel_del_btn').attr('disabled', true);
	} else{
		$(this).parent().children(".q_li").children('.sel_del_btn').attr('disabled', false);
	}
});

/* 문항 삭제 코드 */
$(document).on("click", ".q_del_btn", function(){
	var qRowNum = $(".q_row").length;
	console.log(qRowNum);
	$(this).parent().parent().remove();
	if(qRowNum == 1){
		$("#null_page").css("display", "block");
	}
});

/* 각 유형별 설문지 문항 추가 코드 */
var multiChoiceRowCode = '<div class="row q_row multi_choice_row">'+
														'<div class="col-sm-8">'+
															'<div class="title_input">'+
																'<span class="ui-icon ui-icon-grip-dotted-vertical"></span> '+
																'<input type="text" placeholder="객관식(단일선택) 질문을 입력해주세요.">'+
															'</div>'+
															'<div class="comment_input">'+
																'<span class="ui-icon ui-icon-blank"></span> '+
																'<input type="text" placeholder="설명을 입력해주세요.">'+
															'</div>'+
															'<ul class="list_input ui-sortable">'+
																'<li class="q_li">'+
																	'<span class="ui-icon ui-icon-bullet"></span> '+
																	'<input type="radio" class="multi_q_input"> '+
																	'<input type="text" class="q_sel_input" placeholder="선택지 내용을 입력해주세요."> '+
																	'<button class="q_add_btn"><span class="ui-icon ui-icon-plus"></span></button> '+
																	'<button class="sel_del_btn"><span class="ui-icon ui-icon-minus"></span></button>'+
																'</li>'+
															'</ul>'+
														'</div>'+
														'<div class="col-sm-2">'+
															'<input type="checkbox"><span>필수입력</span><br>'+
															'<input type="checkbox"><span>기타문항</span>'+
														'</div>'+
														'<div class="col-sm-2 text-left">'+
															'<button class="q_del_btn"><span class="ui-icon ui-icon-closethick"></span></button>'+
														'</div>'+
													'</div>';

var multipleMultiChoiceRowCode = '<div class="row q_row multiple_multi_choice_row">'+
																	'<div class="col-sm-8">'+
																		'<div class="title_input">'+
																			'<span class="ui-icon ui-icon-grip-dotted-vertical"></span> '+
																			'<input type="text" placeholder="객관식(다중선택) 질문을 입력해주세요.">'+
																		'</div>'+
																		'<div class="comment_input">'+
																			'<span class="ui-icon ui-icon-blank"></span> '+
																			'<input type="text" placeholder="설명을 입력해주세요.">'+
																		'</div>'+
																		'<ul class="list_input ui-sortable">'+
																			'<li class="q_li">'+
																				'<span class="ui-icon ui-icon-bullet"></span> '+
																				'<input type="checkbox" class="multi_q_input"> '+
																				'<input type="text" class="q_sel_input" placeholder="선택지 내용을 입력해주세요."> '+
																				'<button class="q_add_btn"><span class="ui-icon ui-icon-plus"></span></button> '+
																				'<button class="sel_del_btn"><span class="ui-icon ui-icon-minus"></span></button>'+
																			'</li>'+
																		'</ul>'+
																	'</div>'+
																	'<div class="col-sm-2">'+
																		'<input type="checkbox"><span>필수입력</span><br>'+
																		'<input type="checkbox"><span>기타문항</span>'+
																	'</div>'+
																	'<div class="col-sm-2 text-left">'+
																		'<button class="q_del_btn"><span class="ui-icon ui-icon-closethick"></span></button>'+
																	'</div>'+
																'</div>';

var shortAnswerRowCode = '<div class="row q_row short_answer_row">'+
														'<div class="col-sm-8">'+
															'<div class="title_input">'+
																'<span class="ui-icon ui-icon-grip-dotted-vertical"></span>' +
																'<input type="text" placeholder="주관식(단답형) 질문을 입력해주세요.">'+
															'</div>'+
															'<div class="comment_input">'+
																'<span class="ui-icon ui-icon-blank"></span>'+
																'<input type="text" placeholder="설명을 입력해주세요.">'+
															'</div>'+
														'</div>'+
														'<div class="col-sm-2">'+
															'<div class="btn-group">'+
															  '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
															    '질문 <span class="caret"></span>'+
															  '</button>'+
															  '<ul class="dropdown-menu">'+
															    '<li class="q_style_select" id="q_style_question">질문</li>'+
															    '<li class="q_style_select" id="q_style_prcp_name">참여자명</li>'+
															    '<li class="q_style_select" id="q_style_id">서울지원 아이디</li>'+
															    '<li class="q_style_select" id="q_style_phone">핸드폰 번호</li>'+
															    '<li class="q_style_select" id="q_style_address">주소</li>'+
															    '<li class="q_style_select" id="q_style_mail">이메일</li>'+
															    '<li class="q_style_select" id="q_style_etc">기타</li>'+
															  '</ul>'+
															'</div><br>'+
															'<input type="checkbox"><span>필수입력</span>'+
														'</div>'+
														'<div class="col-sm-2 text-left">'+
															'<button class="q_del_btn"><span class="ui-icon ui-icon-closethick"></span></button>'+
														'</div>'+
													'</div>';

var descriptiveRowCode = '<div class="row q_row descriptive_row">'+
														'<div class="col-sm-8">'+
															'<div class="title_input">'+
																'<span class="ui-icon ui-icon-grip-dotted-vertical"></span> '+
																'<input type="text" placeholder="주관식(서술형) 질문을 입력해주세요.">'+
															'</div>'+
															'<div class="comment_input">'+
																'<span class="ui-icon ui-icon-blank"></span> '+
																'<input type="text" placeholder="설명을 입력해주세요.">'+
															'</div>'+
														'</div>'+
														'<div class="col-sm-2">'+
															'<input type="checkbox"><span>필수입력</span>'+
														'</div>'+
														'<div class="col-sm-2 text-left">'+
															'<button class="q_del_btn"><span class="ui-icon ui-icon-closethick"></span></button>'+
														'</div>'+
													'</div>';

var pointScaleRowCode = '<div class="row q_row point_scale_row">'+
													'<div class="col-sm-8">'+
														'<div class="title_input">'+
														'<span class="ui-icon ui-icon-grip-dotted-vertical"></span> '+
															'<input type="text" placeholder="5점 척도 질문을 입력해주세요.">'+
														'</div>'+
														'<div class="comment_input">'+
															'<span class="ui-icon ui-icon-blank"></span> '+
															'<input type="text" placeholder="설명을 입력해주세요.">'+
														'</div>'+
														'<div class="scale_point_input">'+
															'<span class="ui-icon ui-icon-blank"></span> '+
															'<input type="text" placeholder="1점">'+
															'<input type="text" placeholder="2점">'+
															'<input type="text" placeholder="3점">'+
															'<input type="text" placeholder="4점">'+
															'<input type="text" placeholder="5점">'+
														'</div>'+
													'</div>'+
													'<div class="col-sm-2">'+
														'<input type="checkbox"><span>필수입력</span>'+
													'</div>'+
													'<div class="col-sm-2 text-left">'+
														'<button class="q_del_btn"><span class="ui-icon ui-icon-closethick"></span></button>'+
													'</div>'+
												'</div>';

/* 문제 유형 선택 시 문항 생성 기능 */
$(document).on("click", ".q_type_select_btn", function(){
	var qTypeSelectBtnId = $(this).attr('id');
	/* 객관식 문항의 선택지 드래그 드롭 기능 */
	var qDragDrop = function(){
	    $(".list_input").sortable();
	    $(".list_input").disableSelection();
		};
	$("#null_page").css("display", "none");

	switch(qTypeSelectBtnId){
		case("multi_choice_add"):
				$("#q_section").append(multiChoiceRowCode);
				qDragDrop();
			break;
		case("multiple_multi_choice_add"):
				$("#q_section").append(multipleMultiChoiceRowCode);
				qDragDrop();
			break;
		case("short_answer_add"):
				$("#q_section").append(shortAnswerRowCode);
			break;
		case("descriptive_add"):
				$("#q_section").append(descriptiveRowCode);
			break;
		case("point_scale_add"):
				$("#q_section").append(pointScaleRowCode);
			break;
	}
});

/* 드롭다운선택한 설문조사 유형으로 텍스트 변경 */
$(document).on("click", ".q_style_select", function(){
	var selectedStyle = $(this).text();
	$(this).parent().parent().children('button').html(selectedStyle+' <span class="caret"></span>');
});
