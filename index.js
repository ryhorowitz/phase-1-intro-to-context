// Your code here
function createEmployeeRecord(arr) {
  //create employee obj
  const employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }

  return employee
}

function createEmployeeRecords(d2Arr) {
  const employeeRecords = d2Arr.map(employee => {
    return createEmployeeRecord(employee)
  })

  return employeeRecords
}

function createTimeInEvent(record, timeIn) {
  const [date, hour] = timeIn.split(' ')

  const timeInEvent = {
    type: 'TimeIn',
    date: date,
    hour: Number(hour)
  }

  record.timeInEvents.push(timeInEvent)
  // console.log('timeInEvent', timeInEvent)
  return record
}

function createTimeOutEvent(record, timeOut) {
  const [date, hour] = timeOut.split(' ')

  const timeOutEvent = {
    type: 'TimeOut',
    date: date,
    hour: Number(hour)
  }

  record.timeOutEvents.push(timeOutEvent)
  // console.log('timeOutEvent', timeOutEvent)
  return record
}

function hoursWorkedOnDate(record, date) {

  const timeInOnDate = record.timeInEvents.find(event => event.date === date)
  // console.log('timeInOnDate', timeInOnDate)
  const timeOutOnDate = record.timeOutEvents.find(event => event.date === date)
  // console.log('timeOutOnDate', timeOutOnDate)

  const hourIn = timeInOnDate.hour
  const hourOut = timeOutOnDate.hour
  // console.log('hourOut', hourOut)
  return (hourOut - hourIn) / 100
}

function wagesEarnedOnDate(record, date) {
  const hours = hoursWorkedOnDate(record, date)

  return hours * record.payPerHour
}

function allWagesFor(record) {
  let wages = record.timeInEvents.reduce( (acc, obj) => {
    return acc + wagesEarnedOnDate(record, obj.date)
  }, 0)

  return wages
}

function calculatePayroll(records) {
  return records.reduce( (acc, record) => acc + allWagesFor(record), 0)

}