'use client';

import { Container, Title, Text, Button, Group, Paper } from '@mantine/core';
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconBook } from '@tabler/icons-react';
import { useGSAP } from '@/hooks/useGSAP';

export default function ContactSection() {
  useGSAP((gsap) => {
    gsap.from('.contact-content', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
      }
    });
  }, []);

  return (
    <section id="contact" className="contact-section min-h-screen flex items-center py-20 md:py-32">
      <Container size="sm" className="w-full">
        <div className="contact-content">
          <Title order={2} className="text-4xl md:text-5xl font-bold mb-6 text-center">
            함께 만들어가요
          </Title>
          <Text size="lg" c="dimmed" className="text-center mb-12">
            새로운 기회와 협업을 환영합니다. 언제든 편하게 연락주세요.
          </Text>

          <Paper shadow="sm" p="xl" radius="md" className="text-center">
            <Group justify="center" gap="lg" mb="lg">
              <Button
                size="lg"
                leftSection={<IconMail size={20} />}
                component="a"
                href="mailto:seungwoo321@gmail.com"
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                seungwoo321@gmail.com
              </Button>
            </Group>

            <Text size="sm" c="dimmed" className="mb-6 mt-8">
              소셜 미디어로도 연락 가능합니다
            </Text>

            <Group justify="center" gap="md">
              <Button
                variant="light"
                className="bg-slate-800 hover:bg-slate-700 text-slate-300"
                leftSection={<IconBrandGithub size={20} />}
                component="a"
                href="https://github.com/Seungwoo321"
                target="_blank"
              >
                GitHub
              </Button>
              <Button
                variant="light"
                className="bg-indigo-950/30 hover:bg-indigo-900/50 text-indigo-300"
                leftSection={<IconBrandLinkedin size={20} />}
                component="a"
                href="https://www.linkedin.com/in/seungwoo-lee-6b1b0b1b0/"
                target="_blank"
              >
                LinkedIn
              </Button>
              <Button
                variant="light"
                className="bg-cyan-950/30 hover:bg-cyan-900/50 text-cyan-300"
                leftSection={<IconBook size={20} />}
                component="a"
                href="https://seungwoo321.github.io/"
                target="_blank"
              >
                Tech Blog
              </Button>
            </Group>

            <Text size="xs" c="dimmed" className="mt-12 leading-relaxed">
              프론트엔드 개발과 사용자 경험 개선에 열정을 가지고 있습니다.
              <br className="mb-2" />
              함께 성장할 수 있는 기회를 찾고 있습니다.
            </Text>
          </Paper>
        </div>
      </Container>
    </section>
  );
}