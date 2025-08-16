'use client';

import { Container, Title, Text, TextInput, Textarea, Button, Group, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMail, IconBrandGithub, IconBrandLinkedin, IconSend } from '@tabler/icons-react';
import { useGSAP } from '@/hooks/useGSAP';

export default function ContactSection() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2 ? '이름을 입력해주세요' : null,
      email: (value) => !/^\S+@\S+$/.test(value) ? '올바른 이메일을 입력해주세요' : null,
      message: (value) => value.trim().length < 10 ? '메시지는 10자 이상 입력해주세요' : null,
    },
  });

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

  const handleSubmit = (values: typeof form.values) => {
    const mailtoLink = `mailto:your-email@example.com?subject=포트폴리오 문의 - ${values.name}&body=${encodeURIComponent(
      `이름: ${values.name}\n이메일: ${values.email}\n\n메시지:\n${values.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="contact-section min-h-screen flex items-center py-32 md:py-40 bg-portfolio-background">
      <Container size="md" className="w-full">
        <div className="contact-content">
          <Title order={2} className="text-4xl md:text-5xl font-bold mb-6 text-center">
            연락처
          </Title>
          <Text size="lg" c="dimmed" className="text-center mb-12 md:mb-16">
            새로운 기회와 협업을 환영합니다
          </Text>

          <Paper shadow="sm" p="xl" radius="md" className="bg-portfolio-surface">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="이름"
                placeholder="홍길동"
                size="md"
                required
                mb="md"
                {...form.getInputProps('name')}
                className="mb-4"
              />
              
              <TextInput
                label="이메일"
                placeholder="your@email.com"
                size="md"
                required
                mb="md"
                leftSection={<IconMail size={20} />}
                {...form.getInputProps('email')}
                className="mb-4"
              />
              
              <Textarea
                label="메시지"
                placeholder="프로젝트나 협업에 대해 말씀해주세요"
                size="md"
                minRows={4}
                required
                mb="lg"
                {...form.getInputProps('message')}
                className="mb-6"
              />
              
              <Button
                type="submit"
                size="lg"
                fullWidth
                rightSection={<IconSend size={20} />}
                className="mb-8"
              >
                메시지 보내기
              </Button>
            </form>

            <div className="border-t border-gray-800 pt-8">
              <Text size="sm" c="dimmed" className="text-center mb-4">
                또는 직접 연락주세요
              </Text>
              <Group justify="center" gap="lg">
                <Button
                  variant="subtle"
                  color="gray"
                  leftSection={<IconBrandGithub size={20} />}
                  component="a"
                  href="https://github.com/Seungwoo321"
                  target="_blank"
                >
                  GitHub
                </Button>
                <Button
                  variant="subtle"
                  color="gray"
                  leftSection={<IconBrandLinkedin size={20} />}
                  component="a"
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                >
                  LinkedIn
                </Button>
              </Group>
            </div>
          </Paper>
        </div>
      </Container>
    </section>
  );
}