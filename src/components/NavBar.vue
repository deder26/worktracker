<template>
  <div class="container-fluid">
    <div class="row">
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a href="#" class="navbar-brand">WorkTracker</a>
            <button
              type="button"
              class="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav">
                <a href="#" class="nav-item nav-link active">WriteReport</a>
                <a href="#" class="nav-item nav-link">History</a>
                <a href="#" class="nav-item nav-link">Administration</a>
              </div>
              <div class="navbar-nav ms-auto">
                <a href="#" class="nav-item nav-link">profile</a>
                <a href="#" class="nav-item nav-link">SignOut</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div>
      <section>
        <slot></slot>
      </section>
    </div>
  </div>
</template>
