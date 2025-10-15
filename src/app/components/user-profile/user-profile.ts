import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styles: ``,
})
export class UserProfile implements OnInit {
  form: any;
  user: any = null;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    // initialize form
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      location: [''],
    });

    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getProfile().subscribe({
      next: (res) => {
        console.log(' Profile response:', res);

        const u = res?.data?.user || res?.user || res;
        // Map API data into flat user object
        this.user = {
          name: u?.name || '-',
          email: u?.email || '-',
          phone: u?.phone || '-',
          address: u?.location?.address || '-',
          location: u?.location?.coordinates
            ? `${u.location.coordinates[1]}, ${u.location.coordinates[0]}`
            : '-',
        };

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading profile:', err);
        this.toastr.error('Failed to load profile.');
        this.loading = false;
      },
    });
  }
}
