// Your code here
function createEmployeeRecord([firstNm, familyNm, title, payRatePerHour]) {
  return {
    firstName: firstNm,
    familyName: familyNm,
    title: title,
    payPerHour: payRatePerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords ( employeeRecordsArray )
{
    let employeeRecords = [];
    for ( let employeeRec of employeeRecordsArray )
    {
        employeeRecords.push(createEmployeeRecord(employeeRec))
    }
    return employeeRecords
}

function createTimeInEvent ( employeeRec, dateStamp )
{
     const date = dateStamp.slice(0, 10);
     const hour = parseInt(dateStamp.slice(11));
    let newTimeIn = {
        "type": "TimeIn",
        "hour": hour,
        "date": date
    };

     employeeRec.timeInEvents.push(newTimeIn);
     return employeeRec;
}

function createTimeOutEvent ( employeeRec, dateStamp )
{
  const date = dateStamp.slice(0, 10);
  const hour = parseInt(dateStamp.slice(11));
  const newTimeOut = {
    type: "TimeOut",
    hour: hour,
    date: date,
  };
  employeeRec.timeOutEvents.push(newTimeOut);
  return employeeRec;
}

function hoursWorkedOnDate ( employeeRec, dateStamp )
{
  let hoursWorked;
  let hourIn;
  let hourOut;
  employeeRec.timeInEvents.forEach((timeIn) => {
    if (timeIn.date === dateStamp) {
      hourIn = timeIn.hour / 100;
    }
  });
  employeeRec.timeOutEvents.forEach((timeOut) => {
    if (timeOut.date === dateStamp) {
      hourOut = timeOut.hour / 100;
    }
  });
  hoursWorked = hourOut - hourIn;
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRec, dateStamp) {
  const hoursWorked = hoursWorkedOnDate(employeeRec, dateStamp);
  const wagesEarned = hoursWorked * employeeRec.payPerHour;
  return wagesEarned;
}

function allWagesFor(employeeRec) {
  let allDates = [];
  let pay = 0;
  employeeRec.timeOutEvents.forEach((timeOut) => {
    allDates.push(timeOut.date);
  });
  allDates.forEach((date) => {
    pay = pay + wagesEarnedOnDate(employeeRec, date);
  });
  return pay;
}

function calculatePayroll(employeeRecordsArray) {
  let totalPayOwed = 0;
  employeeRecordsArray.forEach((employeeRec) => {
    totalPayOwed += allWagesFor(employeeRec);
  });
  return totalPayOwed;
}