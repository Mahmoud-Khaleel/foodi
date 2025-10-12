import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDJjOGNlMGFiZGFkY2Q5NWIyNTVmMCIsImlhdCI6MTc2MDI2NzU1NiwiZXhwIjoxNzYwMzUzOTU2fQ.cn8TSxkandtgFzmSu1hHgkN-G8DyJMHyLFU0JhGgKDQ';

  if (authToken) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });
    console.log('➡️ Outgoing Request:', {
      url: authReq.url,
      method: authReq.method,
      headers: authReq.headers.keys().map((k) => ({
        key: k,
        value: authReq.headers.get(k),
      })),
    });
    return next(authReq);
  }

  return next(req);
};
