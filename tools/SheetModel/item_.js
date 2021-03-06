/**
 * 
 * @param {*} id 
 * @param {{sheet:GoogleAppsScript.Spreadsheet.Sheet}} self 
 * @param {*} db 
 * @param {string[][]} matrix 
 * 
 */
function item_(id, self, db, matrix) {
	var self = self;
	var db = db;
	var matrix = matrix;
	var pitem_ = {
		id: id,
		id_pos: self.id_pos,
		str_id: matrix[0][self.id_pos],
	};
    /**
    * Get a Current Id.
    * @return {number}
    */
	function getId() {
		return pitem_.id;
	}

	this.type = self.type;


	/**
	 * @var {item_} iself
	 */
	var iself = this;

	/**
	 * 
	 * @param {any} obj_list
	 * @returns {item_<T>} 
	 */
	function create(obj_list) {
		var lrow = self.sheet.getLastRow();
		var lid = self.sheet.getDataRange().getValues()[lrow - 1][self.id_pos];
		if (lid == 'id')
			lid = 0;
		var im = [];
		for (var k in self.fields) {
			if (typeof obj_list[k] != 'undefined') {
				im.push(obj_list[k]);
				if(this.typesFields){
					if(this.typesFields[k]=='json' && typeof obj_list[k]==='object'){
						this[k] = JsonStringify_(this[obj_list[k]]);
					}else
					this[k] = this[obj_list[k]];
				}else
				this[k] = obj_list[k];
			}
			else {
				im.push('');
				this[k] = "";
			}
		}
		im[self.id_pos] = Number(lid) + 1;
		self.sheet.appendRow(im);
		pitem_.id = im[self.id_pos];
		return this;
	}
	/**
	 * @returns {item_}
	 */
	function update() {
		this.id = pitem_.id;
		var matrix = self.sheet.getDataRange().getValues();
		var qry = new QryTree();
		matrix = qry.edit(self.id_pos + " == " + pitem_.id, matrix, this.fields.map((i, k) => {
			if(this.typesFields){
				if(this.typesFields[i]=='json' && typeof this[i]==='object'){					
					return JsonStringify_(this[i]);
				}				
			}
			return this[i]; }));

		self.sheet.getDataRange().setValues(matrix);
		return this;
	}

	/**
	 * @returns {item_}
	 */
	function Delete() {
		var matrix = self.sheet.getDataRange().getValues();
		var qry = new QryTree();
		qry.custom(self.id_pos + " == " + pitem_.id, matrix, function (row) {
			self.sheet.deleteRow(Number(row) + 1);
		});
		return SheetModel_(self.name, self.type, db, self.id_pos);
	}

	var where_vars = {
		funsAnd: [],
		funsOr: []
	}

	var where_methods=  {
		/**
		 * 
		 * @param {string} param 
		 * @param {any} value 
		 */
		where: function (param, value) {			
			var fn_ = (item) => {
				return item[param] == value;
			}
			where_vars.funsAnd.push(fn_);
			return this;
		},
		/**
		 * 
		 * @param {string} param 
		 * @param {any} value 
		 */
		orWhere: function (param, value) {
			var fn_ = (item) => {
				return item[param] == value;
			}
			where_vars.funsOr.push(fn_);
			return this;
		},
		/**
		 * @returns {item_[]}
		 */
		get: function () {
			var result=[];
			matrix.forEach(( i,k)=>{
				if (k > 0) {
					var nit = Extend_(new item_(i[self.id_pos], self, db, matrix), new self.type());
					i.forEach((r,kk) => {
						nit[iself.fields[kk]] = r;
					})
					var and = true;
					where_vars.funsAnd.forEach((j)=> {
						and = and && j(nit);
					});
					var or = false;
					where_vars.funsOr.forEach((j)=> {
						or = or && j(nit);
					});					
					if (and || or) {
						result.push(nit);
					}
				}
			});
			return result;
		},
		/**
		 * @returns {item_}
		 */
		first: function () {
			return this.get()[0];
		},

	};



	/**
	 * 
	 * @param {string} param 
	 * @param {any} value 
	 * @returns {where_methods}
	 */
	function where(param, value) {
		where_vars.funsAnd = [];
		where_vars.funsOr = [];
		var fn = (item) => {
			return item[param] == value;
		}
		where_vars.funsAnd.push(fn);
		return where_methods;
	};

	function all(isPublic) {
		var result= matrix.map((i, k) => {
			if (k > 0) {
				var nit = Extend_(new item_(i[self.id_pos], self, db, matrix), new self.type());
				this.fields.forEach((r) => {
					nit[r] = i[self.fields[r]];
				})
				if (isPublic) {
					return nit.public();
				}
				return nit;
			}
		});
		result.shift();
		return result;
	}
	function public() {
		var r = {};
		for (var j in this.publicFields) {
			if(this.typesFields){
				if(this.typesFields[this.publicFields[j]]=='json' && typeof this[this.publicFields[j]]==='string'){
					r[this.publicFields[j]] = JsonParse_(this[this.publicFields[j]]);
				}else
				r[this.publicFields[j]] = this[this.publicFields[j]];
			}else
			r[this.publicFields[j]] = this[this.publicFields[j]];
		}
		return r;
	}
	/**
	 * 
	 * @param {item_} item 
	 */
	var qryCallback = (item)=>{return true}
	/**
	 * 
	 * @param {qryCallback} callback 
	 */
	function qryWhere(callback) {
		where_vars.funsAnd = where_vars.funsAnd = [];
		where_vars.funsAnd(callback);
		return where_methods;		
	}
	/**
	 * 
	 * @param {()=>item_} Model 
	 * @param {string} rfk 
	 * @param {string} ofk 
	 * @param {string} ftable 
	 * @param {GoogleAppsScript.Spreadsheet.Sheet} database 
	 * @param {number} idpos optional
	 */
	function hasManyThrow(Model, rfk, ofk, ftable, database, idpos) {
		function as_fmodel() {
			this.fields = ['id', rfk, ofk];
		}
		var fmodel = SheetModel_(ftable, as_fmodel, database, idpos);
		return {
			/**
			 * Get relation items 
			 * @param {string} filter
			 * @returns {item_[]}
			 */
			get: function (filter) {
				var qry1 = "" + rfk + " == " + pitem_.id + "";
				if (typeof filter != 'undefined')
					qry1 += " & " + filter;
				var list_r = fmodel.where(qry1);
				var qry = '';
				for (var i in list_r) {
					if (i > 0)
						qry += " | ";
					qry += list_r[i].getStrId() + " == " + (list_r[i].getField(ofk));
				}
				return Model().where(qry);
			},
			/**
			 * Add item to relation
			 * @param {item_} obj
			 */
			add: function (obj) {
				if (fmodel.where(rfk + ' == ' + pitem_.id + ' & ' + ofk + ' == ' + obj.getId()).length == 0) {
					var m = {};
					m[ofk] = obj.getId();
					m[rfk] = pitem_.id;
					fmodel.create(m);
				}
			},
			/**
			 * Delete if fileter is null all realtion items, else by filter relation items
			 * @param {string} filter
			 */
			del: function (filter) {
				if (typeof filter == 'string') {
					var list = fmodel.where(rfk + ' == ' + pitem_.id + ' & ' + filter);
					for (var i in list) {
						list[i].Delete();
					}
				} else {
					var list = fmodel.where(rfk + ' == ' + pitem_.id);
					for (var i in list) {
						list[i].Delete();
					}
				}
			}
		};
	};
	/**
	 * 
	 * @param {()=>item_} Model 
	 * @param {string} rfk forinekey reference 
	 */
	function hasMany(Model, rfk) {
		return {
			/**
			 * @param {string} filter
			 * @returns {item_[]} 
			 */
			get: function (filter) {
				if (typeof filter == 'string')
					return Model().where(rfk + ' == ' + pitem_.id + ' & ' + filter);
				return Model().where(rfk + ' == ' + pitem_.id);
			},
			/**
			* @param {item_[]} obj
			*/
			attach: function (obj) {
				if (typeof obj == 'object') {
					if (obj.forEach) {
						obj.forEach(function (o) {
							o.setField(rfk, pitem_.id);
							o.update();
						});
						return;
					}
					obj.setField(rfk, pitem_.id);
					obj.update();
				}

			},
			/**
			* @param {item_[]} obj
			*/
			dettach: function (obj) {
				if (obj.length) {
					obj.forEach(function (o) {
						o.setField(rfk, 'null');
						o.update();
					});
					return;
				}
				obj.setField(rfk, 'null');
				obj.update();
			}
		};
	};
	/**
	 * 
	 * @param {()=>item_} Model 
	 * @param {string} rfk forinekey reference 
	 */
	function hasOne(Model, rfk) {
		return {
			/**
			 * @returns {item_[]}
			 */
			get: function () {
				var fk = iself.getField(rfk)
				if (fk != 'null') {
					return Model().where('id ==' + fk)[0];
				}
			},
			/**
			 * @param {item_} obj
			 */
			attach: function (obj) {
				iself.setField(rfk, obj.getId());
				iself.update();
			},
			/**
			* 
			*/
			dettach: function () {
				iself.setField(rfk, 'null');
				iself.update();
			}
		};
	}
	/**
	 * 
	 * @param {()=>item_} Model 
	 * @param {string} rfk 
	 */
	function belongsTo(Model, rfk) {
		return {
			/**
			 * @returns {item_}
			 */
			get: function () {
				return Model().where(rfk + ' == ' + iself.getId())[0];
			},
			/**
			 * @param {item_} item
			 */
			attach: function (item) {
				item.setField(rfk, iself.getId());
				item.update();
			},

			dettach: function () {
				var item = this.get();
				if (item) {
					item.setField(rfk, 'null');
					item.update();
				}
			}
		}
	}
	/**
	 * @returns {any[][]}
	 */
	function getMatrix() {
		return matrix;
	}

	this.getMatrix = getMatrix;
	this.create = create;
	this.update = update;
	this.Delete = Delete;
	this.where = where;
	this.qryWhere = qryWhere;
	this.hasOne = hasOne;
	this.hasManyThrow = hasManyThrow;
	this.hasMany = hasMany;
	this.belongsTo = belongsTo;
	this.all = all;
	this.public = public;

}
