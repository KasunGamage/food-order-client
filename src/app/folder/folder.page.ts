import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from '../services/api/omdb.service';
import { ToastService } from '../services/utilities/toast.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  list: any = [];
  testForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private omdbService: OmdbService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.createForm();
    this.getAll();
  }

  getAll(): void {
    this.omdbService.getAll().subscribe((res) => {
      this.list = res;
    });
  }

  createForm(): void {
    this.testForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(100)]],
      content: [null, [Validators.required]],
    });
  }

  save(): void {
    if (this.testForm.invalid) {
      Object.keys(this.testForm.controls).forEach((field: string) => {
        const control: AbstractControl = this.testForm.get(field);
        control.markAsDirty({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
      });
      this.toastService.showToast('fields rquired');
    } else {
      const body = {
        title: this.testForm.value.title,
        content: this.testForm.value.content,
      };
      this.omdbService.save(body).subscribe(
        (res: any) => {
          this.toastService.showToast('note created successfully');
          this.testForm.reset();
          this.getAll();
        },
        (err) => {
          this.toastService.showToast('error occurd');
        }
      );
    }
  }
}
