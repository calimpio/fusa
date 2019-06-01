/**
 * 
 * @param {[]} item_list
 * @param {number} rate 
 * @param {{min:number,max:number,div:number,page:number}} pagination 
 */
function Pagination_(item_list,rate, pagination){
	function dater(){			
		return  item_list.splice(pagination.min,pagination.max);
	}
	if(!pagination){
		pagination=new PaginRef_(item_list,rate);
		return{data:dater(),pagination:pagination};
	}	
	var div = item_list.length/rate;
	if(pagination.div > div){
		pagination.min = 0;
		pagination.max = rate;
		pagination.div = div;
		pagination.page = 1;
	}else{
		pagination.min = (pagination.page * rate) - rate;
		pagination.max = (pagination.page * rate)
	}
	return{data:dater(),pagination:pagination};
}

/**
 * 
 * @param {[]} item_list 
 * @param {number} rate 
 */
function PaginRef_(item_list,rate){
	this.min=0;
	this.max=rate;
	this.div=item_list.length/rate;
	this.page = 1;
}


