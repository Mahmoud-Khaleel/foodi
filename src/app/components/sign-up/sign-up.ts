import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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
    // ✅ Initialize form
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: [''],
      lat: [null],
      lng: [null],
    });

    // ✅ Automatically get location when component loads
    this.getCurrentLocation();
  }

  // ✅ Get user’s current location using browser API
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

        // ✅ Patch coordinates into form
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

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.warning('Please fill all required fields correctly.');
      return;
    }

    const f = this.form.value;

    // ✅ Format location object for backend
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

    // ✅ Send to API
    this.authService.register(payload).subscribe({
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
