import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    console.log('➡️ Outgoing Request:', {
      url: req.url,
      method: req.method,
      headers: req.headers.keys().map((k) => ({ key: k, value: req.headers.get(k) })),
    });
    return next(cloned);
  }

  return next(req);
};
