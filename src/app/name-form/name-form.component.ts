import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { GenderResponse } from './gender.response';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css'],
})
export class NameFormComponent implements OnInit {
  nameForm!: FormGroup;
  gender = '';

  constructor(
    private readonly httpclient: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.nameForm = this.formBuilder.group({
      name: '',
    });
  }

  async onSubmit(group: FormGroup) {
    try {
      console.log('this.nameForm.value.name: ', group.value.name);
      const response: GenderResponse | undefined = await this.httpclient
        .get<GenderResponse>(
          `https://api.genderize.io?name=${group.value.name}`
        )
        .toPromise();
      console.log('Response ', response);

      if (!response)
        throw new Error('Failed to get response from genderize.io');
      this.gender = response.gender;
    } catch (exception) {
      console.error(exception);
    }
  }
}
