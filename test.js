function Time(today) {
   this.today = today;
   this.validate();
   return this;
}

Time.prototype.setParseDate = function(today) {
   this.minutes = today.getMinutes();
   this.hour = today.getHours();
   this.dd = today.getDate();
   this.mm = today.getMonth()+1;
   this.yyyy = today.getFullYear();

   if (this.mm < 10) {
      this.mm = '0' + this.mm;
   }
   if (this.dd < 10) {
      this.dd = '0' + this.dd;
   }
   if (this.hour < 10) {
      this.hour = '0' + this.hour;
   }
   if (this.minutes < 10) {
      this.minutes = '0' + this.minutes;
   }
};

Time.prototype.getTime = function() {
   this.today.getTime();
};

Time.prototype.getParseDate = function() {
   return this.yyyy + '-' + this.mm + '-' + this.dd + ' ' + this.hour + ':' + this.minutes;
};

Time.prototype.validate = function() {
   this.setParseDate(this.today);

   if(!new RegExp(/([0-9]{4})-([1-2]{1})?([0-9]{1,2})-([1-3]{1})?([0-9]{1,2})( )[0-9]{1,2}(\:)([0-9]{1,2})/).test(this.getParseDate())) {
      throw new DOMException('invalid day MM-dd');
   }
};


function EventDay(startTime, endTime, number) {
      this.startTime = new Time(startTime);
      this.endTime = new Time(endTime);
      this.number = number;
}


function TimeDeal() {
   TimeDeal.prototype.eventDayList = [];
   TimeDeal.prototype.event;
}

TimeDeal.prototype.addDay = function(startTime, endTime, number) {
   this.eventDayList.push(new EventDay(startTime, endTime, number));
};

TimeDeal.prototype.getDay = function(index) {
   return this.eventDayList[index];
};

TimeDeal.prototype.isEvent = function(date) {
   this.findEvent(date);
   return (typeof this.event !== 'undefined');
};

TimeDeal.prototype.findEvent = function(date) {
   this.event = undefined;
   for (var i = 0; i < this.eventDayList.length; i++) {
      this.findTime(this.eventDayList[i], date);
   }
   return this.event;
};

TimeDeal.prototype.isTime = function(value, date) {
   return date.getTime() >= value.startTime.today.getTime()
       && date.getTime() <= value.endTime.today.getTime();
};

TimeDeal.prototype.findTime = function(value, date) {
   if(this.isTime(value, date)) {
      this.event = value;
   }
};



test('이벤트중인 이벤트번호 찾기', () => {
   var timeDeal = new TimeDeal();
   var number = 1111;
   var number2 = 2222;
   timeDeal.addDay(new Date('2021-05-05 10:00'), new Date('2021-05-05 23:59'), number);
   timeDeal.addDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00'), number2);

   var event = {};
   if(timeDeal.isEvent(new Date())) {
      event = timeDeal.findEvent(new Date());
   }
   expect(event.number).toBe(number);
});
test('이벤트중 유무 찾기', () => {
   var timeDeal = new TimeDeal();
   var number = 1111;
   var number2 = 2222;
   timeDeal.addDay(new Date('2021-05-05 10:00'), new Date('2021-05-05 23:59'), number);
   timeDeal.addDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00'), number2);
   expect(timeDeal.isEvent(new Date())).toBe(true);
});
test('이벤트 번호할당', () => {
   var timeDeal = new TimeDeal();
   var number = 1111;
   timeDeal.addDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00'), number);
   expect(timeDeal.getDay(0).number).toBe(number);
});
test('이벤트날짜 목록 시간 등록 테스트', () => {
   var timeDeal = new TimeDeal();
   timeDeal.addDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00'));
   expect(timeDeal.getDay(0).startTime.hour).toBe(10);
   expect(timeDeal.getDay(0).endTime.hour).toBe(14);
});
test('이벤트날짜 조회 테스트', () => {
   var timeDeal = new TimeDeal();
   timeDeal.addDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00'));
   expect(timeDeal.getDay(0).startTime.dd).toBe(11);
});
test('이벤트날짜 생성 테스트', () => {
   var timeDeal = new TimeDeal();
   console.log(timeDeal.addDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00')));
});
test('이벤트생성 테스트', () => {
   var eventDay = new EventDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00'));
   expect(eventDay.startTime.dd).toBe(11);
});
test("1 is 1", () => {
   expect(1).toBe(1);
});