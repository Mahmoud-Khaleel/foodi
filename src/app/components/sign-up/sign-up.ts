import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.html',
})
export class SignUp implements OnInit {
  form: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: 'change',
        },
      ],
      phone: [
        '',
        {
          validators: [Validators.required, Validators.pattern(/^(\+20|0)?1[0125][0-9]{8}$/)],
          updateOn: 'change',
        },
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'change',
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(6)],
          updateOn: 'change',
        },
      ],
      address: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'change',
        },
      ],
      lat: [null],
      lng: [null],
    });

    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      this.toastr.warning('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log('📍 Coordinates:', lat, lng);

        this.form.patchValue({ lat, lng });
        this.toastr.success('Location detected successfully!');
      },
      (error) => {
        console.error('❌ Error getting location:', error);
        this.toastr.warning('Could not get your location. Please allow location access.');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  isLoading: boolean = false;

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.warning('Please fill all required fields correctly.');
      return;
    }

    this.isLoading = true;

    const f = this.form.value;

    const location = {
      type: 'Point',
      coordinates: [f.lng, f.lat],
      address: f.address || 'Not provided',
    };

    const payload = {
      name: f.name,
      phone: f.phone,
      email: f.email,
      password: f.password,
      location,
    };

    console.log('🟢 Final Signup Payload:', payload);

    this.authService
      .register(payload)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          console.log('✅ Signup response:', res);
          this.toastr.success('Account created successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Signup error:', err);
          const msg = err.error?.message || 'Signup failed. Try again.';
          this.toastr.error(msg);
        },
      });
  }
}
