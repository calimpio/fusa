(function (tree, global) {
	global.QryTree = tree().QryTree;
}(function () {
	function Base(type_name) {
		return {
			type: 'base.' + type_name,
			childs: [],
			parent: null,
			addChild: function (child) {
				child.parent = this;
				this.childs.push(child);
			}
		};
	}

	function SentenceRoot() {
		var root = null;
		var cursor = root = LogicOperative();
		var BA = null;
		this.start = function (qry, data_matrix) {
			BA = new BoolAutomata();
			BA.field(qry, 0);            
			var result = [];
			for (var row in data_matrix) {
				if (root.exec(data_matrix[row])) {
					result.push(data_matrix[row]);
				}
			}
			return result;
		};
      
        this.qry_field = function (qry, data_matrix, fields_obj) {
			BA = new BoolAutomata();
			BA.field(qry, 0);
            root.changeFields(fields_obj);
			var result = [];
			for (var row=1;row<data_matrix.length;row++) {
				if (root.exec(data_matrix[row])) {
					result.push(data_matrix[row]);
				}
			}
			return result;
		};
      
        this.edit = function (qry,matrix,values) {
            BA = new BoolAutomata();
            BA.field(qry,0);
            for (var row in matrix) {
				if (root.exec(matrix[row])) {
					matrix[row] = values;
				}
			}
            return matrix;
        };
        this.custom = function (qry,matrix,callback) {
            BA = new BoolAutomata();
            BA.field(qry,0);
            for (var row in matrix) {
				if (root.exec(matrix[row])) {
					callback(row,matrix[row]);
				}
			}            
        };
		var field = {
			state: 1,
			data1: '',
			data2: '',
		};
		var comparative = {
			state: 1,
			data: '',
		};

		function BoolAutomata() {
			this.ok = false;
			this.field = function (qry, i) {
				if (i < qry.length) {
					switch (field.state) {
					case 1:
						{
							if (qry[i] == ' ') return this.field(qry, i + 1);
							field.state = 2;
							this.ok = false;
							var comp = Comparative();
							cursor.addLeft(comp);
							cursor = comp;
							field.data1 += qry[i];
							return this.field(qry, i + 1);
						}
					case 2:
						{
							if (qry[i] != ' ') {
								field.data1 += qry[i];
								return this.field(qry, i + 1);
							}
							field.state = 3;
							return this.comparative(qry, i + 1);
						}
					case 3:
						{
							if (qry[i] == ' ') return this.field(qry, i + 1);
							field.state = 4;
							field.data2 += qry[i];
							if (i + 1 < qry.length) return this.field(qry, i + 1);
							cursor.data = field.data2;
							this.ok = true;
							field.state = 1;
							field.data2 = '';
							field.data1 = '';
							return {
								message: 'good:' + i,
								status: true
							};
						}
					case 4:
						{
							if (qry[i] != ' ') {
								field.data2 += qry[i];
								if (i + 1 < qry.length) return this.field(qry, i + 1);
							}
							cursor.data = field.data2;
							this.ok = true;
							field.data2 = '';
							field.data1 = '';
							if (i + 1 >= qry.length) return {
								message: 'good:' + i,
								status: true
							};
							return this.logicOperative(qry, i + 1);
						}
					case 5:
						{
							if (qry[i] == ' ') return this.field(qry, i + 1);
							field.state = 2;
							this.ok = false;
							var comp = new Comparative();
							cursor.addRight(comp);
							cursor = comp;
							field.data1 += qry[i];
							return this.field(qry, i + 1);
						}
					}
				}
				if (!this.ok) return {
					message: 'length out',
					status: false
				};
				return {
					message: 'good:' + i,
					status: true
				};
			};
			this.comparative = function (qry, i) {
				switch (comparative.state) {
				case 1:
					{
						if (qry[i] == ' ') return this.comparative(qry, i + 1);
						if (i + 1 >= qry.length) return {
							message: 'length out',
							status: false
						};
						this.operatorDoub(qry, i, '=', '=');
						this.operatorDoub(qry, i, '!', '=');
						this.operatorDoub(qry, i, '<', '=');
						this.operatorDoub(qry, i, '>', '=');
						this.operatorOne(qry, i, '>');
						this.operatorOne(qry, i, '<');
						return {
							message: 'sintax error char:' + i + " at " + qry[i],
							status: false
						};
					}
				}
			};
			this.operatorDoub = function (qry, i, f1, f2) {
				if (qry[i] == f1) {
					if (qry[i + 1] == f2 && cursor.type == 'comparative') {
						cursor.field = field.data1;
						cursor.operator = f1 + f2;
						return this.field(qry, i + 2);
					}
				}
			}
			this.operatorOne = function (qry, i, f1) {
				if (qry[i] == f1 && cursor.type == 'comparative') {
					cursor.field = field.data1;
					cursor.operator = f1;
					return this.field(qry, i + 1);
				}
			}
			this.logicOperative = function (qry, i) {
				if (i < qry.length) {
					if (qry[i] == ' ') return this.logicOperative(qry, i + 1);
					this.ok = false;
					if (cursor.type == 'comparative') {
						if (typeof cursor.parent.right != 'object') {
							if (qry[i] == '&' || qry[i] == '|') {
								cursor.parent.operator = qry[i];
								cursor = cursor.parent;
								field.state = 5;
								return this.field(qry, i + 1);
							}
						}
						if (qry[i] == '&' || qry[i] == '|') {
							var logic = new LogicOperative();
							var leftLogic = cursor.parent;
							cursor = root = logic;
							cursor.addLeft(leftLogic);
							cursor.operator = qry[i];
							field.state = 5;
							return this.field(qry, i + 1);
						}
					}
				}
				if (this.ok) return {
					message: 'good:' + i,
					status: true
				};
				return {
					message: 'sintax error char:' + i + " at " + qry[i],
					status: false
				};
			};
		}
	}

	function Comparative() {
		return {
			type: 'comparative',
			parent: null,
			field: '',
			operator: '',
			data: '',
			exec: function (data_list) {
				if (this.operator == '==') return data_list[this.field] == this.data;
				if (this.operator == '!=') return data_list[this.field] != this.data;
				if (this.operator == '>') return data_list[this.field] > this.data;
				if (this.operator == '<') return data_list[this.field] < this.data;
				if (this.operator == '<=') return data_list[this.field] <= this.data;
				if (this.operator == '>=') return data_list[this.field] >= this.data;
			},
            changeFields:function(fields)
            {
               this.field = fields[this.field];
            }
		};
	}

	function LogicOperative() {
		return {
			type: 'logicOperative',
			parent: null,
			left: null,
			right: true,
			operator: '',
			addLeft: function (child) {
				child.parent = this;
				this.left = child;
			},
			addRight: function (child) {
				child.parent = this;
				this.right = child;
			},
			exec: function (data_list) {
				if(!this.left)return true;
				if (typeof this.right == 'boolean') return this.left.exec(data_list);
				if (this.operator == '&') return this.left.exec(data_list) && this.right.exec(data_list);
				if (this.operator == '|') return this.left.exec(data_list) || this.right.exec(data_list);
			},
           changeFields:function(fields)
           {
			 if(!this.left)return true;
             if (typeof this.right == 'boolean') return this.left.changeFields(fields);
             this.left.changeFields(fields);
             this.right.changeFields(fields);
           }
		};
	}
	return {
		QryTree: SentenceRoot
	};
}, this));