<template>




  <div class="app-wrapper" :class="classObj">

		<header id="header">
	  
			<!-- start Navbar (Header) -->
			<nav class="navbar navbar-primary navbar-fixed-top navbar-sticky-function">

				<div class="navbar-top">
				
					<div class="container">
						
						<div class="flex-row flex-align-middle">
							<div class="flex-shrink flex-columns">
								<a class="navbar-logo" href="index.html">
									<img src="images/logo-white.png" alt="Logo" />
								</a>
							</div>
							<div class="flex-columns">
								<div class="pull-right">
								
									<div class="navbar-mini">
										<ul class="clearfix">
										
											<li class="dropdown bt-dropdown-click hidden-xs">
												<a id="language-dropdown" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
													<i class="ion-social-usd hidden-xss"></i> Dollar
													<span class="caret"></span>
												</a>
												<ul class="dropdown-menu" aria-labelledby="language-dropdown">
													<li><a href="#"><i class="ion-social-usd"></i> Dollar</a></li>
													<li><a href="#"><i class="ion-social-euro"></i> Europe</a></li>
													<li><a href="#"><i class="ion-social-yen"></i> Yen</a></li>
												</ul>
											</li>
											
											<li class="dropdown bt-dropdown-click hidden-xs">
												<a id="currncy-dropdown" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
													<i class="ion-android-globe hidden-xss"></i> English
													<span class="caret"></span>
												</a>
												<ul class="dropdown-menu" aria-labelledby="language-dropdown">
													<li><a href="#">English</a></li>
													<li><a href="#">France</a></li>
													<li><a href="#">Japanese</a></li>
												</ul>
											</li>
											
											<li class="dropdown bt-dropdown-click visible-xs">
												<a id="currncy-language-dropdown" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
													<i class="fa fa-cog"></i>
												</a>
												<ul class="dropdown-menu" aria-labelledby="language-dropdown">
													<li><a href="#"><i class="ion-social-usd"></i> Dollar</a></li>
													<li><a href="#"><i class="ion-social-euro"></i> Europe</a></li>
													<li><a href="#"><i class="ion-social-yen"></i> Yen</a></li>
													<li class="divider"></li>
													<li><a href="#">English</a></li>
													<li><a href="#">France</a></li>
													<li><a href="#">Japanese</a></li>
												</ul>
											</li>
											
											<li class="user-action">
												<a data-toggle="modal" href="#loginModal" class="btn">Sign up/in</a>
											</li>

										</ul>
									</div>
						
								</div>
							</div>
						</div>

					</div>
					
				</div>
				
				<div class="navbar-bottom hidden-sm hidden-xs">
				
					<div class="container">
					
						<div class="row">
						
							<div class="col-sm-9">
								
								<div id="navbar" class="collapse navbar-collapse navbar-arrow">
									<ul class="nav navbar-nav" id="responsive-menu">
										<li><a href="index.html">Home</a>
											<ul>
												<li><a href="index.html">Home 01 - Default</a></li>
												<li><a href="index-02.html">Home 02 - Background Slider</a></li>
												<li><a href="index-03.html">Home 03 - Video Background</a></li>
												<li><a href="index-04.html">Home 04 - Smaller Package Items</a></li>
												<li>
													<a href="#">Sub-menu</a>
													 <ul>
														<li><a href="#">Sub-menu 2</a></li>
														<li><a href="#">Sub-menu 2</a></li>
														<li><a href="#">Sub-menu 2</a></li>
													</ul>
												</li>
											</ul>
										</li>
										<li><a href="result-grid.html">Tour Package</a>
											<ul>
												<li><a href="result-list.html">Result - List</a></li>
												<li><a href="result-grid.html">Result - Grid</a></li>
												<li><a href="detail-page.html">Detail Page</a></li>
											</ul>
										</li>
										<li><a href="about.html">About Us</a></li>
										<li><a href="blog.html">Blog</a>
											<ul>
												<li><a href="blog.html">Blog</a></li>
												<li><a href="blog-single.html">Blog Single</a></li>
											</ul>
										</li>
										<li><a href="#">Pages</a>
											<ul>
												<li><a href="result-list.html">Result - List</a></li>
												<li><a href="result-grid.html">Result - Grid</a></li>
												<li><a href="detail-page.html">Detail Page</a></li>
												<li><a href="payment.html">Payment</a></li>
												<li><a href="confirmation.html">Confirmation</a></li>
												<li><a href="faq.html">FAQ</a></li>
												<li><a href="about.html">About Us</a></li>
												<li><a href="static-page.html">Static Page</a></li>
												<li><a href="blog.html">Blog</a></li>
												<li><a href="blog-single.html">Blog Single</a></li>
												<li><a href="contact.html">Contact us</a></li>
											</ul>
										</li>
										<li><a href="contact.html">Contact us</a></li>
									</ul>
								</div><!--/.nav-collapse -->
								
							</div>
							
							<div class="col-sm-3">
							
								<div class="navbar-phone"><i class="fa fa-phone"></i> Call us: +66 28 878 5452</div>
							
							</div>

						</div>
						
					</div>
				
				</div>

				<div id="slicknav-mobile"></div>
				
			</nav>
			<!-- end Navbar (Header) -->

		</header>











111


    layout2
     <router-view ></router-view>
  </div>
</template>

<script>

export default {
  name: 'layout2'

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
