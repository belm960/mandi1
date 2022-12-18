import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Calendar } from './calendar.model';
import { MatRadioChange } from '@angular/material/radio';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { CalendarService } from './calendar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar', { static: false })
  calendar: Calendar | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  filterOptions = "All";
  calendarData: any;

  public filters = [
    { name: 'all', value: 'All', checked: 'true' },
    { name: 'work', value: 'Work', checked: 'false' },
    { name: 'personal', value: 'Personal', checked: 'false' },
    { name: 'important', value: 'Important', checked: 'false' },
    { name: 'travel', value: 'Travel', checked: 'false' },
    { name: 'friends', value: 'Friends', checked: 'false' }
  ];



  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];
  calendarWeekends = true;
  @ViewChild('callAPIDialog', { static: false }) callAPIDialog: TemplateRef<any>;
  calendarEvents: EventInput[];
  tempEvents: EventInput[];
  todaysEvents: EventInput[];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    public calendarService: CalendarService,
    private snackBar: MatSnackBar) {
    this.dialogTitle = 'Add New Event';
    this.calendar = new Calendar({});
    this.addCusForm = this.createContactForm(this.calendar);

  }

  public ngOnInit(): void {

    this.calendarEvents = this.events();
    this.tempEvents = this.calendarEvents;
    // you can also get events from json file using following code
    // this.calendarService.getAllCalendars().subscribe((data: Calendar[]) => {
    //   this.calendarEvents = data;
    // })
  }

  createContactForm(calendar): FormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [
        calendar.title,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]
      ],
      category: [calendar.category],
      startDate: [calendar.startDate,
      [Validators.required]
      ],
      endDate: [calendar.endDate,
      [Validators.required]
      ],
      details: [
        calendar.details,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]
      ],
    });
  }

  addNewEvent() {

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: this.calendar,
        action: 'add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result === "submit") {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
          id: this.calendarData.id,
          title: this.calendarData.title,
          start: this.calendarData.startDate,
          end: this.calendarData.endDate,
          className: this.calendarData.category,
          groupId: this.calendarData.category,
          details: this.calendarData.details,
        })
        this.addCusForm.reset();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  eventClick(row) {
    const calendarData: any = {
      id: row.event.id,
      title: row.event.title,
      category: row.event.groupId,
      startDate: row.event.start,
      endDate: row.event.end,
      details: row.event.extendedProps.details
    };


    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: calendarData,
        action: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "submit") {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents.forEach(function (element, index) {
          if (this.calendarData.id === element.id) {
            this.editEvent(index, this.calendarData);
          }
        }, this);
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
        this.addCusForm.reset();
      } else if (result === "delete") {
        this.calendarData = this.calendarService.getDialogData();
        this.calendarEvents.forEach(function (element, index) {
          if (this.calendarData.id === element.id) {
            this.filterEvent(element);
          }
        }, this);
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  editEvent(eventIndex, calendarData) {
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
    singleEvent.className = this.getClassNameValue(calendarData.category);
    singleEvent.groupId = calendarData.category;
    singleEvent.details = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
  }
  handleEventRender(info) {
    // console.log(info)
    // this.todaysEvents = this.todaysEvents.concat(info);
  }
  changeCategory(e: MatRadioChange) {
    this.filterOptions = e.value;
    this.calendarEvents = this.tempEvents;
    this.calendarEvents.forEach(function (element, index) {
      if (this.filterOptions !== "all" && this.filterOptions.toLowerCase() !== element.groupId) {
        this.filterEvent(element);
      }
    }, this);

  }
  filterEvent(element) {
    this.calendarEvents = this.calendarEvents.filter(item => item !== element);
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  public randomIDGenerate(length, chars) {
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  getClassNameValue(category) {
    let className: string;

    if (category === "work")
      className = "fc-event-success"
    else if (category === "personal")
      className = "fc-event-warning"
    else if (category === "important")
      className = "fc-event-primary"
    else if (category === "travel")
      className = "fc-event-danger"
    else if (category === "friends")
      className = "fc-event-info"

    return className;
  }
  events() {
    return [
      {
        id: "event1",
        title: "All Day Event",
        start: new Date(year, month, 1, 0, 0),
        end: new Date(year, month, 1, 23, 59),
        className: "fc-event-success",
        groupId: "work",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
      },
      {
        id: "event2",
        title: "Break",
        start: new Date(year, month, day + 28, 16, 0),
        end: new Date(year, month, day + 29, 20, 0),
        allDay: false,
        className: "fc-event-primary",
        groupId: "important",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. ",
      },
      {
        id: "event3",
        title: "Shopping",
        start: new Date(year, month, day + 4, 12, 0),
        end: new Date(year, month, day + 4, 20, 0),
        allDay: false,
        className: "fc-event-warning",
        groupId: "personal",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see. ",
      },
      {
        id: "event4",
        title: "Meeting",
        start: new Date(year, month, day + 14, 10, 30),
        end: new Date(year, month, day + 16, 20, 0),
        allDay: false,
        className: "fc-event-success",
        groupId: "work",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
      },
      {
        id: "event5",
        title: "Lunch",
        start: new Date(year, month, day, 11, 0),
        end: new Date(year, month, day, 14, 0),
        allDay: false,
        className: "fc-event-primary",
        groupId: "important",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
      },
      {
        id: "event6",
        title: "Meeting",
        start: new Date(year, month, day + 2, 12, 30),
        end: new Date(year, month, day + 2, 14, 30),
        allDay: false,
        className: "fc-event-success",
        groupId: "work",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
      },
      {
        id: "event7",
        title: "Birthday Party",
        start: new Date(year, month, day + 17, 19, 0),
        end: new Date(year, month, day + 17, 19, 30),
        allDay: false,
        className: "fc-event-warning",
        groupId: "personal",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
      },
      {
        id: "event8",
        title: "Go to Delhi",
        start: new Date(year, month, day + -5, 10, 0),
        end: new Date(year, month, day + -4, 10, 30),
        allDay: false,
        className: "fc-event-danger",
        groupId: "travel",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
      },
      {
        id: "event9",
        title: "Get To Gather",
        start: new Date(year, month, day + 6, 10, 0),
        end: new Date(year, month, day + 7, 10, 30),
        allDay: false,
        className: "fc-event-info",
        groupId: "friends",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
      },
      {
        id: "event10",
        title: "Collage Party",
        start: new Date(year, month, day + 20, 10, 0),
        end: new Date(year, month, day + 20, 10, 30),
        allDay: false,
        className: "fc-event-info",
        groupId: "friends",
        details:
          "Her extensive perceived may any sincerity extremity. Indeed add rather may pretty see.",
      },
    ];
  }
}

