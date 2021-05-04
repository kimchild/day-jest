class Time {
   today;

   yyyy;
   mm;
   dd;

   hour;
   minutes;

   constructor(today) {
      this.today = today;
      this.validate();
      return this;
   }

   setParseDate(today) {
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
   }

   getParseDate() {
      return this.yyyy + '-' + this.mm + '-' + this.dd + ' ' + this.hour + ':' + this.minutes;
   }

   validate() {
      this.setParseDate(this.today);

      if(!new RegExp(/([0-9]{4})-([1-2]{1})?([0-9]{1,2})-([1-3]{1})?([0-9]{1,2})( )[0-9]{1,2}(\:)([0-9]{1,2})/).test(this.getParseDate())) {
         throw new DOMException('invalid day MM-dd');
      }
   }

}

class EventDay {
   startTime;
   endTime;

   constructor(startTime, endTime) {
      this.startTime = new Time(startTime);
      this.endTime = new Time(endTime);
      return this;
   }

}

class TimeDeal {
   eventDayList = [];
   constructor() {
   }

   addDay(startTime, endTime) {
      this.eventDayList.push(new EventDay(startTime, endTime));
   }
   getDay(index) {
      return this.eventDayList[index];
   }
}

// module.exports = MyClass;
test('이벤트날짜 목록 시간 등록 테스트', () => {
   var timeDeal = new TimeDeal();
   timeDeal.addDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00'));
   // timeDeal.addDay(new Date('2021-05-11 00:00'));
   // timeDeal.addDay(new Date('2021-05-11 00:00'));
   console.log('# timeDeal : ', timeDeal.getDay(0));
   expect(timeDeal.getDay(0).startTime.hour).toBe(10);
   expect(timeDeal.getDay(0).endTime.hour).toBe(14);
});
test('이벤트날짜 조회 테스트', () => {
   var timeDeal = new TimeDeal();
   timeDeal.addDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00'));
   console.log('# timeDeal : ', timeDeal.getDay(0));
   expect(timeDeal.getDay(0).startTime.dd).toBe(11);
});
test('이벤트날짜 생성 테스트', () => {
   var timeDeal = new TimeDeal();
   console.log(timeDeal.addDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00')));
});
test('이벤트생성 테스트', () => {
   var eventDay = new EventDay(new Date('2021-05-11 10:00'), new Date('2021-05-11 14:00'));
   console.log('# eventDay : ', eventDay);
   expect(eventDay.startTime.dd).toBe(11);
});
test("1 is 1", () => {
   expect(1).toBe(1);
});