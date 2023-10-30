<template>
	<n-layout-footer position="absolute" data-test="footer">
		<div class="footer-container">
			<div class="footer-logo">
				<img :src="footerLogo" alt="" />
			</div>
			<div class="footer-copyright">
				<p>
					© 2021, Game Tracker Inc. Todos os direitos reservados. Nulla
					facilisi. Etiam sagittis congue tempor. Pellentesque habitant morbi
					tristique senectus et netus et malesuada fames ac turpis egestas.
					Suspendisse eu velit et ante luctus egestas. Aenean sed nisi tellus.
					Duis non ornare libero. Quisque suscipit maximus nisi, in gravida
					felis. Cras ornare mauris ac nisi congue, ut condimentum sem
					tincidunt. Phasellus semper tellus malesuada turpis gravida cursus.
					Duis nec eleifend nunc, vitae finibus elit. Aliquam eget diam vitae
					purus suscipit viverra.
				</p>
			</div>
			<div class="footer-links">
				<n-a class="link" href="#">Termos de Serviço</n-a>
				<n-a class="link" href="#">Política de Privacidade</n-a>
				<n-a class="link" href="#">Trabalhe conosco</n-a>
				<n-a class="link" href="#">Contato</n-a>
			</div>
		</div>
	</n-layout-footer>
</template>

<script setup>
import { NLayoutFooter, NA } from 'naive-ui';
import footerLogo from '@/assets/vector.svg';
</script>

<style scoped>
.n-layout-footer {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #0b1641;
	height: 311px;
	max-width: 100vw;
}
.footer-container {
	display: flex;
	flex-direction: column;
	align-items: start;
	max-width: 1440px;
	gap: 15px;
}

.footer-copyright {
	color: white;
	font-weight: lighter;
}

.footer-logo {
	align-self: center;
}

.footer-links {
	display: flex;
	gap: 50px;
}

.link {
	text-decoration: none;
	color: white;
	font-weight: 700;
}
@media (max-width: 600px) {
	.footer-copyright p {
		text-align: center;
		padding: 0 10px;
	}

	.n-layout-footer {
		height: 400px;
		overflow: scroll;
	}
	.footer-container {
		padding: 5px 0;
		justify-content: center;
		align-items: center;
		gap: 0;
	}

	.footer-links {
		flex-direction: column;
		align-items: center;
		gap: 0;
	}
}
</style>
