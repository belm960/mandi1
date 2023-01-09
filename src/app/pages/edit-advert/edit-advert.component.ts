import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddInfo } from 'src/app/models/addInfo';
import { AddGroupService } from 'src/app/services/addgroup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.sass']
})
export class EditAdvertComponent implements OnInit {

  advert = new AddInfo();
  title: string;
  addId: string;
  isEdit = false;
  advertForm: FormGroup;
  constructor(private addgroupService: AddGroupService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {

        this.addId = this.route.snapshot.paramMap.get('id');
        if(this.addId){
            this.title="Edit Advert";
            this.addgroupService.getDetails(this.addId).subscribe(
              data =>{
                this.advert = data;
              },
              error =>{
                console.log(error);
              }
            );
        }
        else{this.title="Add Advert"}

                this.advertForm = this.fb.group(
                  {
                    name: [this.advert.name],
                    companyName:[this.advert.companyName],
                    photo: [this.advert.photo],
                    category: [this.advert.category],
                    description: [this.advert.description],
                    teleLink: [this.advert.teleLink],
                    facebookLink: [this.advert.facebookLink],
                    ownerId: [this.advert.ownerId],
                    minPrice:[this.advert.minPrice],
                    usageLimit: [this.advert.usageLimit],
                    sellLimit: [this.advert.sellLimit],
                    sellPrize: [this.advert.sellPrize],

                  }
                );

  }

    ngOnInit() {
        

    }

    update() {
        this.addgroupService.updateadd(this.advert, this.addId).subscribe(advert => {
                Swal.fire('Successfull','you have updated advert info','success');
                this.router.navigate(['/pages/advert']);
            },
            err => {
            });

    }

    onSubmit() {
        if (this.addId) {
            this.update();
        } else {
            this.add();
        }
    }

    add() {
        this.addgroupService.createadd(this.advertForm.value).subscribe(() => {
                Swal.fire('Successfully','you have added the product','success');
                this.router.navigate(['/pages/advert']);
            });
    }

    cancel(){
      this.router.navigate(['/pages/advert']);
    }

}
