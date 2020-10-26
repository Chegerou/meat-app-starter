import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { MenuComponent } from "./restaurant-details/menu/menu.component";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";
import { ReviewsComponent } from "./restaurant-details/reviews/reviews.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { LoginComponent } from "./security/login/login.component";

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', loadChildren: "./about/about.module#AboutModule" },
    { path: 'restaurants', component: RestaurantsComponent },
    { path: 'order', loadChildren: "./order/order.module#OrderModule" },
    { path: 'order-summary', component: OrderSummaryComponent },
    {
        path: 'restaurants/:id', component: RestaurantDetailsComponent,
        children: [
            {path: '', redirectTo:'menu', pathMatch:'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent},
        ]
    },
    { path: '**', component: NotFoundComponent },

]
