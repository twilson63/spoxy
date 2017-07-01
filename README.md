# Album Search Proxy

A proxy that searches spotify

## Usage

```
fetch(`https://music-search.jrs.camp?q=u2`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => res.json())
  .catch(err => console.log(err))
```

### Token

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqcnMuY2FtcCIsImlhdCI6MTQ5ODg2OTM0MiwiZXhwIjoxNTkzNTYzNzQyLCJhdWQiOiJtdXNpYy1zZWFyY2guanJzLmNhbXAiLCJzdWIiOiIxMjM0In0.XtmiG7OD3pGdS748IC4CRJp_qUa7A_JvtNu2G_GcIP8
```
